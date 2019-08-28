import _ from 'lodash';

export function initTree(treeArr) {
	const newTree = [];
	_.sortBy(treeArr, (item) => -item.tree_level).forEach((tree) => {
		const children = _.filter(
			newTree,
			(item) => item.tree_path.startsWith(tree.tree_path) && item.tree_level === tree.tree_level + 1
		);

		newTree.push({
			...tree,
			children
		});
	});

	return newTree;
}
