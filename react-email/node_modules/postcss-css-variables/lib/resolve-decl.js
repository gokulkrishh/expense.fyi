var resolveValue = require('./resolve-value');
var generateScopeList = require('./generate-scope-list');
var gatherVariableDependencies = require('./gather-variable-dependencies');

var isUnderScope = require('./is-under-scope');
var isNodeUnderScope = require('./is-node-under-scope');

var shallowCloneNode = require('./shallow-clone-node');
var findNodeAncestorWithSelector = require('./find-node-ancestor-with-selector');
var cloneSpliceParentOntoNodeWhen = require('./clone-splice-parent-onto-node-when');



function eachMapItemDependencyOfDecl(variablesUsedList, map, decl, cb) {
	// Now find any at-rule declarations that pertains to each rule
	// Loop through the variables used
	variablesUsedList.forEach(function(variableUsedName) {

		// Find anything in the map that corresponds to that variable
		gatherVariableDependencies(variablesUsedList, map).deps.forEach(function(mapItem) {

			var mimicDecl;
			if(mapItem.isUnderAtRule) {

				// Get the inner-most selector of the at-rule scope variable declaration we are matching
				//		Because the inner-most selector will be the same for each branch, we can look at the first one [0] or any of the others
				var varDeclScopeList = generateScopeList(mapItem.parent, true);
				var innerMostAtRuleSelector = varDeclScopeList[0].slice(-1)[0];
				var nodeToSpliceParentOnto = findNodeAncestorWithSelector(innerMostAtRuleSelector, decl.parent);

				// Splice on where the selector starts matching the selector inside at-rule
				// See: `test/fixtures/cascade-on-nested-rules.css`
				var varDeclAtRule = mapItem.parent.parent;
				mimicDecl = cloneSpliceParentOntoNodeWhen(decl, varDeclAtRule, function(ancestor) {
					return ancestor === nodeToSpliceParentOnto;
				});


				//console.log('amd og', generateScopeList(decl.parent, true));
				//console.log('amd', generateScopeList(mimicDecl.parent, true));
				//console.log(generateScopeList(mapItem.parent, true));
				//console.log('amd isNodeUnderScope', isNodeUnderScope(mimicDecl.parent, mapItem.parent), mapItem.decl.value);
			}
			// TODO: use regex from `isUnderScope`
			else if(isUnderScope.RE_PSEUDO_SELECTOR.test(mapItem.parent.selector)) {
				// Create a detached clone
				var ruleClone = shallowCloneNode(decl.parent);
				ruleClone.parent = decl.parent.parent;

				// Add the declaration to it
				mimicDecl = decl.clone();
				ruleClone.append(mimicDecl);

				var lastPseudoSelectorMatches = mapItem.parent.selector.match(new RegExp(isUnderScope.RE_PSEUDO_SELECTOR.source + '$'));
				var lastPseudoSelector = lastPseudoSelectorMatches ? lastPseudoSelectorMatches[2] : '';

				ruleClone.selector += lastPseudoSelector;
			}

			// If it is under the proper scope,
			// we need to check because we are iterating over all map entries
			if(mimicDecl && isNodeUnderScope(mimicDecl, mapItem.parent, true)) {
				cb(mimicDecl, mapItem);
			}
		});
	});
}




// Resolve the decl with the computed value
// Also add in any media queries that change the value as necessary
function resolveDecl(decl, map, /*optional*/shouldPreserve, /*optional*/preserveAtRulesOrder, /*optional*/logResolveValueResult) {
	shouldPreserve = (typeof shouldPreserve === "function" ? shouldPreserve(decl) : shouldPreserve) || false;
	preserveAtRulesOrder = preserveAtRulesOrder || false;

	// Make it chainable
	var _logResolveValueResult = function(valueResults) {
		if(logResolveValueResult) {
			logResolveValueResult(valueResults);
		}

		return valueResults;
	};



	// Grab the balue for this declarations
	//console.log('resolveDecl 1');
	var valueResults = _logResolveValueResult(resolveValue(decl, map));


	// Resolve the cascade dependencies
	// Now find any at-rule declarations that need to be added below each rule
	//console.log('resolveDecl 2');
	var previousAtRuleNode;
	eachMapItemDependencyOfDecl(valueResults.variablesUsed, map, decl, function(mimicDecl, mapItem) {
		var ruleClone = shallowCloneNode(decl.parent);
		var declClone = decl.clone();
		// Add the declaration to our new rule
		ruleClone.append(declClone);

		let preserveVariable;
		if(typeof shouldPreserve === "function") {
			preserveVariable = shouldPreserve(decl);
		} else {
			preserveVariable = shouldPreserve;
		}
		if(preserveVariable === true) {
			declClone.cloneAfter();
		}

		// No mangle resolve
		declClone.value = _logResolveValueResult(resolveValue(mimicDecl, map, true)).value;

		if(mapItem.isUnderAtRule) {
			// Create the clean atRule for which we place the declaration under
			var atRuleNode = shallowCloneNode(mapItem.parent.parent);

			// Add the rule to the atRule
			atRuleNode.append(ruleClone);


			// Since that atRuleNode can be nested in other atRules, we need to make the appropriate structure
			var parentAtRuleNode = atRuleNode;
			var currentAtRuleNode = mapItem.parent.parent;
			while(currentAtRuleNode.parent.type === 'atrule') {
				// Create a new clean clone of that at rule to nest under
				var newParentAtRuleNode = shallowCloneNode(currentAtRuleNode.parent);

				// Append the old parent
				newParentAtRuleNode.append(parentAtRuleNode);
				// Then set the new one as the current for next iteration
				parentAtRuleNode = newParentAtRuleNode;

				currentAtRuleNode = currentAtRuleNode.parent;
			}

			// Put the first atRuleStructure after the declaration's rule,
			// and after that, put them right after the previous one
			decl.parent.parent.insertAfter(preserveAtRulesOrder && previousAtRuleNode || decl.parent, parentAtRuleNode);

			// Save referance of previous atRuleStructure
			previousAtRuleNode = parentAtRuleNode
		}
		else {
			ruleClone.selector = mimicDecl.parent.selector;

			// Put the first atRuleStructure after the declaration's rule,
			// and after that, put them right after the previous one
			decl.parent.parent.insertAfter(preserveAtRulesOrder && previousAtRuleNode || decl.parent, ruleClone);
		}
	});


	// If we are preserving var(...) usage and the value changed meaning it had some
	if(shouldPreserve === true && decl.value !== valueResults.value) {
		decl.cloneAfter();
	}


	// Set 'undefined' value as a string to avoid making other plugins down the line unhappy
	// See #22
	if (valueResults.value === undefined) {
		valueResults.value = 'undefined';
	}


	// Set the new value after we are done dealing with at-rule stuff
	decl.value = valueResults.value;
}






module.exports = resolveDecl;
