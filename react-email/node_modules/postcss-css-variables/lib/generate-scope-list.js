
var generateDescendantPiecesFromSelector = require('./generate-descendant-pieces-from-selector');


var generateScopeList = function(node, /*optional*/includeSelf) {
	includeSelf = includeSelf || false;

	var selectorScopeList = [
		// Start off with one branch
		[]
	];
	var currentNodeParent = includeSelf ? node : node.parent;
	while(currentNodeParent) {

		// `currentNodeParent.selectors` is a list of each comma separated piece of the selector
		var scopePieces = (currentNodeParent.selectors || []).map(function(selectorPiece) {
			return {
				value: selectorPiece,
				type: 'selector'
			};
		});

		// If it is a at-rule, then we need to construct the proper piece
		if(currentNodeParent.type === 'atrule') {
			scopePieces = [].concat(currentNodeParent.params).map(function(param) {
				return {
					value: '@' + currentNodeParent.name + ' ' + param,
					type: 'atrule'
				};
			});
		}

		// Branch each current scope for each comma separated selector
		// Otherwise just keep the [1] branch going
		var branches = (scopePieces.length > 0 ? scopePieces : [1]).map(function() {
			return selectorScopeList.map(function(scopePieces) {
				return scopePieces.slice(0);
			});
		});

		scopePieces.forEach(function(scopeObject, index) {
			// Update each selector string with the new piece
			branches[index] = branches[index].map(function(scopeStringPieces) {

				var descendantPieces = [scopeObject.value];
				// Split at any descendant combinators to properly make the scope list
				if(scopeObject.type === 'selector') {
					descendantPieces = generateDescendantPiecesFromSelector(scopeObject.value);
				}

				// Add to the front of the array
				scopeStringPieces.unshift.apply(scopeStringPieces, descendantPieces);

				return scopeStringPieces;
			});
		});

		// Start from a new list so we can
		// Flatten out the branches a bit and and merge back into the list
		selectorScopeList = [];
		branches.forEach(function(branch) {
			selectorScopeList = selectorScopeList.concat(branch);
		});

		currentNodeParent = currentNodeParent.parent;
	}

	return selectorScopeList;
};

module.exports = generateScopeList;
