// Variables that referenced in some way by the target variable
//
// `variablesUsed`: Array of string variable names that may be in the map
//
// Returns: `object`
//	 - `deps`: array of complete dependecies recursively gathered (entries from the `map`)
//	 - `hasCircularOrSelfReference`: bool of whether there is some circular or self reference of dependencies.
//	 	 - If true, the variable can't be deduced
var gatherVariableDependencies = function(variablesUsed, map, _dependencyVariablesList) {
	_dependencyVariablesList = _dependencyVariablesList || [];
	var hasCircularOrSelfReference = false;

	if(variablesUsed) {
		_dependencyVariablesList = variablesUsed.reduce(function(dependencyVariablesList, variableUsedName) {
			var isVariableInMap = !!map[variableUsedName];
			var doesThisVarHaveCircularOrSelfReference = !isVariableInMap ? false : dependencyVariablesList.some(function(dep) {
				return map[variableUsedName].some(function(mapItem) {
					// If already in the list, we got a circular reference
					if(dep === mapItem) {
						return true;
					}

					return false;
				});
			});
			// Update the overall state of dependency health
			hasCircularOrSelfReference = hasCircularOrSelfReference || doesThisVarHaveCircularOrSelfReference;


			if(isVariableInMap && !hasCircularOrSelfReference) {
				dependencyVariablesList = dependencyVariablesList.concat(map[variableUsedName]);

				(map[variableUsedName] || []).forEach(function(mapItem) {
					var result = gatherVariableDependencies(mapItem.variablesUsed, map, dependencyVariablesList);
					dependencyVariablesList = result.deps;
					hasCircularOrSelfReference = hasCircularOrSelfReference || result.hasCircularOrSelfReference;
				});
			}

			return dependencyVariablesList;
		}, _dependencyVariablesList);
	}

	return {
		deps: _dependencyVariablesList,
		hasCircularOrSelfReference: hasCircularOrSelfReference
	};
};

module.exports = gatherVariableDependencies;
