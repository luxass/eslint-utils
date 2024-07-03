import type { TSESTree } from "@typescript-eslint/typescript-estree";

type NodeVisitor = (node: TSESTree.Node) => boolean;

function walk(node: TSESTree.Node, visitor: NodeVisitor): boolean {
  if (visitor(node)) {
    return true;
  }

  for (const key in node) {
    // @ts-expect-error - yes yes yes
    if (node[key] && typeof node[key] === "object") {
    // @ts-expect-error - yes yes yes
      if (node[key].type && walk(node[key], visitor)) {
        return true;
        // @ts-expect-error - yes yes yes
      } else if (Array.isArray(node[key])) {
        // @ts-expect-error - yes yes yes
        for (const child of node[key]) {
          if (child.type && walk(child, visitor)) {
            return true;
          }
        }
      }
    }
  }

  return false;
}

export function selectNode<TNode extends TSESTree.Node = TSESTree.Node>(ast: any, selector: NodeSelector<TNode>): TNode | undefined {
  let selectedNode: TNode | undefined;

  walk(ast, (node) => {
    if (selector(node)) {
      selectedNode = node;
      return true; // stop the walk when we found the node
    }
    return false;
  });

  return selectedNode;
}

type NodeSelector<TNode extends TSESTree.Node = TSESTree.Node> = (node: TSESTree.Node) => node is TNode;
