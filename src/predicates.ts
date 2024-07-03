import type { TSESTree } from "@typescript-eslint/utils";

/**
 * Checks if a given node is an Identifier.
 *
 * @param {TSESTree.Node | undefined} node - The node to check.
 * @returns {node is TSESTree.Identifier} `true` if the node is an Identifier, `false` otherwise.
 */
export function isIdentifier(node: TSESTree.Node | undefined): node is TSESTree.Identifier {
  return node !== undefined && node.type === "Identifier";
}

/**
 * Checks if a given node is a Literal.
 *
 * @param {TSESTree.Node | undefined} node - The node to check.
 * @returns {node is TSESTree.Literal} `true` if the node is a Literal, `false` otherwise.
 */
export function isLiteral(node: TSESTree.Node | undefined): node is TSESTree.Literal {
  return node !== undefined && node.type === "Literal";
}

/**
 * Checks if a given node is a FunctionDeclaration.
 * @param {TSESTree.Node | undefined} node - The node to check.
 * @returns {node is TSESTree.FunctionDeclaration} `true` if the node is a FunctionDeclaration, `false` otherwise.
 */
export function isFunctionDeclaration(
  node: TSESTree.Node | undefined,
): node is TSESTree.FunctionDeclaration {
  return node !== undefined && node.type === "FunctionDeclaration";
}

/**
 * Checks if a given node is a FunctionExpression.
 * @param {TSESTree.Node | undefined} node - The node to check.
 * @returns {node is TSESTree.FunctionExpression} `true` if the node is a FunctionExpression, `false` otherwise.
 */
export function isFunctionExpression(
  node: TSESTree.Node | undefined,
): node is TSESTree.FunctionExpression {
  return node !== undefined && node.type === "FunctionExpression";
}

/**
 * Checks if a given node is a ThrowStatement.
 * @param {TSESTree.Node | undefined} node - The node to check.
 * @returns {node is TSESTree.ThrowStatement} `true` if the node is a ThrowStatement, `false` otherwise.
 */
export function isThrowStatement(node: TSESTree.Node | undefined): node is TSESTree.ThrowStatement {
  return node !== undefined && node.type === "ThrowStatement";
}

/**
 * Checks if a given node is a ReturnStatement.
 * @param {TSESTree.Node | undefined} node - The node to check.
 * @returns {node is TSESTree.ReturnStatement} `true` if the node is a ReturnStatement, `false` otherwise.
 */
export function isReturnStatement(
  node: TSESTree.Node | undefined,
): node is TSESTree.ReturnStatement {
  return node !== undefined && node.type === "ReturnStatement";
}

/**
 * Checks if a given node is a VariableDeclaration.
 * @param {TSESTree.Node | undefined} node - The node to check.
 * @returns {node is TSESTree.VariableDeclaration} `true` if the node is a VariableDeclaration, `false` otherwise.
 */
export function isVariableDeclaration(
  node: TSESTree.Node | undefined,
): node is TSESTree.VariableDeclaration {
  return node !== undefined && node.type === "VariableDeclaration";
}
