interface State<P = any> {
  isChild?: boolean;
  parent?: P;
}

export type DFSState<P = any> = State<P>;

export const dfs = <
  T extends Record<string, any> = any,
  N extends Record<string, any> = any,
>(
  tree: T[] = [],
  callback?: (node: N, state?: State<N>) => void,
  state: State<N> = {},
): N[] => {
  const result: N[] = [];

  if (!Array.isArray(tree)) {
    return result;
  }

  tree.forEach((node) => {
    callback?.(node as unknown as N, state);

    (node as N & { children?: N[] }).children = dfs<T, N>(node.children, callback, {
      ...state,
      isChild: true,
      parent: node as unknown as N,
    });

    if (node.children?.length === 0) {
      delete node.children;
    }

    result.push(node as unknown as N);
  });

  return result;
};
