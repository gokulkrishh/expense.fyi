// PostCSS CSS Variables (postcss-css-variables)
// v0.5.0
//
// https://github.com/MadLittleMods/postcss-css-variables

// For Debugging
//var nomo = require('node-monkey').start({port: 50501});

var extend = require("extend");

var shallowCloneNode = require("./lib/shallow-clone-node");
var resolveValue = require("./lib/resolve-value");
var resolveDecl = require("./lib/resolve-decl");

// A custom property is any property whose name starts with two dashes (U+002D HYPHEN-MINUS)
// `--foo`
// See: http://dev.w3.org/csswg/css-variables/#custom-property
var RE_VAR_PROP = /(--(.+))/;

function eachCssVariableDeclaration(css, cb) {
  // Loop through all of the declarations and grab the variables and put them in the map
  css.walkDecls(function(decl) {
    // If declaration is a variable
    if (RE_VAR_PROP.test(decl.prop)) {
      cb(decl);
    }
  });
}

function cleanUpNode(node) {
  // If we removed all of the declarations in the rule(making it empty),
  // then just remove it
  var nodeToPossiblyCleanUp = node;
  while (nodeToPossiblyCleanUp && nodeToPossiblyCleanUp.nodes.length <= 0) {
    var nodeToRemove =
      nodeToPossiblyCleanUp.type !== "root" ? nodeToPossiblyCleanUp : null;

    if (nodeToRemove) {
      // Get a reference to it before we remove
      // and lose reference to the child after removing it
      nodeToPossiblyCleanUp = nodeToRemove.parent;

      nodeToRemove.remove();
    } else {
      nodeToPossiblyCleanUp = null;
    }
  }
}

var defaults = {
  // Allows you to preserve custom properties & var() usage in output.
  // `true`, `false`, or `'computed'`
  preserve: false,
  // Define variables via JS
  // Simple key-value pair
  // or an object with a `value` property and an optional `isImportant` bool property
  variables: {},
  // Preserve variables injected via JS with the `variables` option above
  // before serializing to CSS (`false` will remove these variables from output)
  preserveInjectedVariables: true,
  // Will write media queries in the same order as in the original file.
  // Currently defaulted to false for legacy behavior. We can update to `true` in a major version
  preserveAtRulesOrder: false
};

module.exports = (options = {}) => {
  var opts = extend({}, defaults, options);

  // Work with opts here

  return {
    postcssPlugin: 'postcss-css-variables',
    Once(css, { decl, result, rule }) {
      // Transform CSS AST here

      /* * /
      try {
      /* */

      // List of nodes that if empty, will be removed
      // We use this because we don't want to modify the AST when we still need to reference these later on
      var nodesToRemoveAtEnd = [];

      // Keep track of the injected from `opts.variables` to remove at the end
      // if user passes `opts.preserveInjectedVariables = false`
      var injectedDeclsToRemoveAtEnd = [];

      // Map of variable names to a list of declarations
      var map = {};

      // Add the js defined variables `opts.variables` to the map
      map = extend(
        map,
        Object.keys(opts.variables).reduce(function(
          prevVariableMap,
          variableName
        ) {
          var variableEntry = opts.variables[variableName];
          // Automatically prefix any variable with `--` (CSS custom property syntax) if it doesn't have it already
          variableName =
            variableName.slice(0, 2) === "--"
              ? variableName
              : "--" + variableName;
          var variableValue = (variableEntry || {}).value || variableEntry;
          var isImportant = (variableEntry || {}).isImportant || false;

          // Add a root node to the AST
          var variableRootRule = rule({ selector: ":root" });
          css.root().prepend(variableRootRule);
          // Add the variable decl to the root node
          var varDecl = decl({
            prop: variableName,
            value: variableValue,
            important: isImportant
          });
          variableRootRule.append(varDecl);

          // Collect JS-injected variables for removal if `opts.preserveInjectedVariables = false`
          if (!opts.preserveInjectedVariables) {
            injectedDeclsToRemoveAtEnd.push(varDecl);
          }

          // Add the entry to the map
          prevVariableMap[variableName] = (
            prevVariableMap[variableName] || []
          ).concat({
            decl: varDecl,
            prop: variableName,
            calculatedInPlaceValue: variableValue,
            isImportant: isImportant,
            variablesUsed: [],
            parent: variableRootRule,
            isUnderAtRule: false
          });

          return prevVariableMap;
        },
        {})
      );

      // Chainable helper function to log any messages (warnings)
      var logResolveValueResult = function(valueResult) {
        // Log any warnings that might of popped up
        var warningList = [].concat(valueResult.warnings);
        warningList.forEach(function(warningArgs) {
          warningArgs = [].concat(warningArgs);
          result.warn.apply(result, warningArgs);
        });

        // Keep the chain going
        return valueResult;
      };

      // Collect all of the variables defined
      // ---------------------------------------------------------
      // ---------------------------------------------------------
      //console.log('Collecting variables defined START');
      eachCssVariableDeclaration(css, function(decl) {
        var declParentRule = decl.parent;

        var valueResults = logResolveValueResult(resolveValue(decl, map));
        // Split out each selector piece into its own declaration for easier logic down the road
        decl.parent.selectors.forEach(function(selector) {
          // Create a detached clone
          var splitOutRule = shallowCloneNode(decl.parent);
          splitOutRule.selector = selector;
          splitOutRule.parent = decl.parent.parent;

          var declClone = decl.clone();
          splitOutRule.append(declClone);

          var prop = decl.prop;
          map[prop] = (map[prop] || []).concat({
            decl: declClone,
            prop: prop,
            calculatedInPlaceValue: valueResults.value,
            isImportant: decl.important || false,
            variablesUsed: valueResults.variablesUsed,
            parent: splitOutRule,
            // variables inside root or at-rules (eg. @media, @support)
            isUnderAtRule: splitOutRule.parent.type === "atrule"
          });
        });

        let preserveDecl;
        if (typeof opts.preserve === "function") {
          preserveDecl = opts.preserve(decl);
        } else {
          preserveDecl = opts.preserve;
        }
        // Remove the variable declaration because they are pretty much useless after we resolve them
        if (!preserveDecl) {
          decl.remove();
        }
        // Or we can also just show the computed value used for that variable
        else if (preserveDecl === "computed") {
          decl.value = valueResults.value;
        }
        // Otherwise just keep them as var declarations
        //else {}

        // We add to the clean up list if we removed some variable declarations to make it become an empty rule
        // We clean up later on because we don't want to modify the AST when we still need to reference these later on
        if (declParentRule.nodes.length <= 0) {
          nodesToRemoveAtEnd.push(declParentRule);
        }
      });
      //console.log('Collecting variables defined END');

      // Resolve variables everywhere
      // ---------------------------------------------------------
      // ---------------------------------------------------------

      // Collect all the rules that have declarations that use variables
      var rulesThatHaveDeclarationsWithVariablesList = [];
      css.walk(function(rule) {
        // We're only interested in Containers with children.
        if (rule.nodes === undefined) return;

        var doesRuleUseVariables = rule.nodes.some(function(node) {
          if (node.type === "decl") {
            var decl = node;
            // If it uses variables
            // and is not a variable declarations that we may be preserving from earlier
            if (
              resolveValue.RE_VAR_FUNC.test(decl.value) &&
              !RE_VAR_PROP.test(decl.prop)
            ) {
              return true;
            }
          }

          return false;
        });

        if (doesRuleUseVariables) {
          rulesThatHaveDeclarationsWithVariablesList.push(rule);
        }
      });

      rulesThatHaveDeclarationsWithVariablesList.forEach(function(rule) {
        var rulesToWorkOn = [].concat(rule);
        // Split out the rule into each comma separated selector piece
        // We only need to split if it's actually a Rule with multiple selectors (comma separated)
        if (rule.type === "rule" && rule.selectors.length > 1) {
          // Reverse the selectors so that we can cloneAfter in the same comma separated order
          rulesToWorkOn = rule.selectors.reverse().map(function(selector) {
            var ruleClone = rule.cloneAfter();
            ruleClone.selector = selector;

            return ruleClone;
          });

          rule.remove();
        }

        // Resolve the declarations
        rulesToWorkOn.forEach(function(ruleToWorkOn) {
          ruleToWorkOn.nodes.slice(0).forEach(function(node) {
            if (node.type === "decl") {
              var decl = node;
              resolveDecl(
                decl,
                map,
                opts.preserve,
                opts.preserveAtRulesOrder,
                logResolveValueResult
              );
            }
          });
        });
      });

      // Clean up any nodes we don't want anymore
      // We clean up at the end because we don't want to modify the AST when we still need to reference these later on
      nodesToRemoveAtEnd.forEach(cleanUpNode);

      // Clean up JS-injected variables marked for removal
      injectedDeclsToRemoveAtEnd.forEach(function(injectedDecl) {
        injectedDecl.remove();
      });

      //console.log('map', map);

      /* * /
      }
      catch(e) {
        //console.log('e', e.message);
        console.log('e', e.message, e.stack);
      }
      /* */
    }
  };
};

module.exports.postcss = true;
