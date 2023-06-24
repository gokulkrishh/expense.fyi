var isUnderScope = require('./is-under-scope');
var generateScopeList = require('./generate-scope-list');

var isNodeUnderScope = function(node, scopeNode, /*optional*/ignorePseudo) {
	var nodeScopeList = generateScopeList(node, true);
	var scopeNodeScopeList = generateScopeList(scopeNode, true);

	return isUnderScope(nodeScopeList, scopeNodeScopeList, ignorePseudo);
};

module.exports = isNodeUnderScope;
