var generateScopeList = require('./generate-scope-list');

// Find a node starting from the given node that matches
// Works on a PostCSS AST tree
var findNodeAncestorWithSelector = function(selector, node) {
	var matchingNode;

	// Keep going until we run out of parents to search
	// or we found the node
	var currentNode = node;
	while(currentNode.parent && !matchingNode) {
		// A trick to get the selector split up. Generate a scope list on a clone(clean parent)
		var currentNodeScopeList = generateScopeList(currentNode.clone(), true);

		currentNodeScopeList.some(function(scopePieces) {
			return scopePieces.some(function(scopePiece) {
				if(scopePiece === selector) {
					matchingNode = currentNode;
					return true;
				}

				return false;
			});
		});

		currentNode = currentNode.parent;
	}

	return matchingNode;
};

module.exports = findNodeAncestorWithSelector;
