// Unit Tests: https://regex101.com/r/oS4zJ8/3

var RE_SELECTOR_DIRECT_DESCENDANT_SPLIT = (/(.*?(?:(?:\([^\)]+\)|\[[^\]]+\]|(?!>>|<|\+|~|\s).)+)(?:(?:(?:>(?!>))|(?:\s?>(?!>)\s?))(?!\s+))(?!(?:>>|<|\+|~)[\s]+?))/);


var generateDirectDescendantPiecesFromSelector = function(selector) {
	return selector.split(RE_SELECTOR_DIRECT_DESCENDANT_SPLIT)
		.filter(function(piece) {
			if(piece.length > 0) {
				return true;
			}
			return false;
		})
		.map(function(piece) {
			// Trim whitespace which would be a normal descendant selector
			// and trim off the CSS4 descendant `>>` into a normal descendant selector
			return piece.trim().replace(/\s*?>\s*?/g, '');
		});
};

module.exports = generateDirectDescendantPiecesFromSelector;
