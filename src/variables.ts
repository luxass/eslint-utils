import type { TSESLint, TSESTree } from '@typescript-eslint/utils'
import { isIdentifier, isReturnStatement, isThrowStatement, isVariableDeclaration } from './predicates'

/**
 * Retrieves the returned variable from a given statement node.
 *
 * @param {TSESTree.Statement} node - The statement node to extract the returned variable from.
 * @returns {TSESTree.Identifier | undefined} The returned variable if it exists, otherwise undefined.
 */
export function getReturnedVariable(node: TSESTree.Statement): TSESTree.Identifier | undefined {
  return (isReturnStatement(node) || isThrowStatement(node))
    && node.argument
    && isIdentifier(node.argument)
    ? node.argument
    : undefined
}

export interface DeclaredVariable {
  id: TSESTree.Identifier
  init: TSESTree.Expression
}

/**
 * Retrieves the declared variable from a given statement node.
 *
 * @param {TSESTree.Statement} node - The statement node to extract the declared variable from.
 * @returns {DeclaredVariable} An object containing the identifier and initializer expression of the declared variable, or `undefined` if the node does not represent a valid declaration.
 */
export function getDeclaredVariable(node: TSESTree.Statement): DeclaredVariable | undefined {
  if (isVariableDeclaration(node) && node.declarations.length === 1) {
    const declaration = node.declarations[0]
    if (isIdentifier(declaration?.id) && declaration.init && !declaration.id.typeAnnotation) {
      return { id: declaration.id, init: declaration.init }
    }
  }
  return undefined
}

/**
 * Retrieves the declared variables within a given scope.
 *
 * @param {TSESLint.Scope.Scope} scope - The scope to retrieve the declared variables from.
 * @returns {TSESLint.Scope.Variable[]} An array of declared variables.
 */
export function getDeclaredVariables(
  scope: TSESLint.Scope.Scope,
): TSESLint.Scope.Variable[] {
  if (scope.variableScope === scope) {
    return scope.variables
  }

  return scope.variables.concat(scope.variableScope.variables)
}
