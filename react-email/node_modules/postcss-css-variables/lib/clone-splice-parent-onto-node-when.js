
var shallowCloneNode = require('./shallow-clone-node');

// Splice on a parent scope onto a node
// And return a detached clone
var cloneSpliceParentOntoNodeWhen = function(node, parent, /*optional*/whenCb) {
	whenCb = whenCb || function() {
		return true;
	};

	var cloneList = [];

	// Gather node ancestors and clone along the way
	var current = node;
	var isWhenNow = false;
	while(current && !isWhenNow) {
		if(current.type === 'decl') {
			cloneList.push(current.clone());
		}
		else {
			cloneList.push(shallowCloneNode(current));
		}

		isWhenNow = whenCb(current);
		current = current.parent;
	}


	// Gather parent ancestors all the way up and clone along the way
	// The list goes from lowest to highest ancestor
	var cloneParentList = [];
	var currentParent = parent;
	while(currentParent) {
		cloneParentList.push(shallowCloneNode(currentParent));

		currentParent = currentParent.parent;
	}
	// Assign parents to our parent clones
	cloneParentList.forEach(function(parentClone, index, cloneParentList) {
		// Keep assigning parents detached until just very end
		if(index + 1 < cloneParentList.length) {
			//parentClone.moveTo(cloneParentList[index+1]);
			parentClone.parent = cloneParentList[index + 1];
		}
	});


	// Assign parents to our node clones
	cloneList.forEach(function(clone, index, cloneList) {
		// Keep assigning parents detached until just very end
		if(index + 1 < cloneList.length) {
			//clone.moveTo(cloneList[index+1]);
			clone.parent = cloneList[index + 1];
		// Then splice on the new parent scope
		} else {
			// Set the highest parent ancestor to back to where we should splice in
			cloneParentList.slice(-1)[0].parent = current;
			// Set the node clone to the lowest parent ancestor to finish off the splice
			//clone.moveTo(cloneParentList[0]);
			clone.parent = cloneParentList[0];
		}
	});

	return cloneList[0];
};

module.exports = cloneSpliceParentOntoNodeWhen;
