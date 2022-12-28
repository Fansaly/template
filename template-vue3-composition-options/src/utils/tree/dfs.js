export const dfs = (tree = [], callback, state = {}) => {
  const result = [];

  if (!Array.isArray(tree)) {
    return result;
  }

  tree.forEach((node) => {
    callback?.(node, state);

    node.children = dfs(node.children, callback, {
      ...state,
      isChild: true,
      parent: node,
    });

    if (node.children?.length === 0) {
      delete node.children;
    }

    result.push(node);
  });

  return result;
};
