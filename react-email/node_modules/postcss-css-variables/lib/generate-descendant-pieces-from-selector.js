// Unit Tests: https://regex101.com/r/oP0fM9/15
//
// It is a shame the regex has to be this long. Maybe a CSS selector parser would be better.
// We could almost use `/\b\s(?![><+~][\s]+?)/` to split the selector but this doesn't work with attribute selectors
var RE_SELECTOR_DESCENDANT_SPLIT = (/(.*?(?:(?:\([^\)]+\)|\[[^\]]+\]|(?![><+~\s]).)+)(?:(?:(?:\s(?!>>))|(?:\t(?!>>))|(?:\s?>>\s?))(?!\s+))(?![><+~][\s]+?))/);


var generateDescendantPiecesFromSelector = function(selector) {
	return selector.split(RE_SELECTOR_DESCENDANT_SPLIT)
		.filter(function(piece) {
			if(piece.length > 0) {
				return true;
			}
			return false;
		})
		.map(function(piece) {
			// Trim whitespace which would be a normal descendant selector
			// and trim off the CSS4 descendant `>>` into a normal descendant selector
			return piece.trim().replace(/\s*?>>\s*?/g, '');
		});
};

module.exports = generateDescendantPiecesFromSelector;
