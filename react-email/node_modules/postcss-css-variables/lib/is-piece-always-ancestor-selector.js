var alwaysAncestorSelector = {
	'*': true,
	':root': true,
	'html': true
};

// This means it will be always be an ancestor of any other selector
var isPieceIsAlwaysAncestorSelector = function(piece) {
	return !!alwaysAncestorSelector[piece];
};

module.exports = isPieceIsAlwaysAncestorSelector;
