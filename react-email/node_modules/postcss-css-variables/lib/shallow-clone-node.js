// Inspired by the PostCSS clone: https://github.com/postcss/postcss/blob/caba908d0f4e362466252202e6be84660c33d8a5/lib/node.js#L17
var shallowCloneNode = function(obj, parent) {
	var cloned = new obj.constructor();

	Object.keys(obj).forEach(function(i) {
		if (!obj.hasOwnProperty(i)) {
			return;
		}

		var value = obj[i];
		var type = typeof value;

		if (i === 'parent' && type === 'object') {
			if (parent) {
				cloned[i] = parent;
			}
		}
		else if(i === 'source') {
			cloned[i] = value;
		}
		else if (value instanceof Array) {
			if(i === 'nodes') {
				cloned[i] = [];
			}
			else {
				cloned[i] = value.map(function(j) {
					shallowCloneNode(j, cloned);
				});
			}
		}
		else if (
			i !== 'before' && i !== 'after' &&
			i !== 'between' && i !== 'semicolon'
		) {
			if(type === 'object') {
				value = shallowCloneNode(value);
			}

			cloned[i] = value;
		}
	});

	return cloned;
};

module.exports = shallowCloneNode;
