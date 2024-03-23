import { describe, expect, it } from 'vitest'
import { parse } from '@typescript-eslint/typescript-estree'
import type { TSESTree } from '@typescript-eslint/utils'
import {
  isFunctionDeclaration,
  isFunctionExpression,
  isIdentifier,
  isLiteral,
  isReturnStatement,
  isThrowStatement,
  isVariableDeclaration,
} from '../src/predicates'
import { selectNode } from './utils'

describe('isIdentifier', () => {
  it('should return true for an Identifier node', () => {
    const code = 'let foo = 0'
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      range: true,
    })

    const node = selectNode(ast, (node): node is TSESTree.Identifier => node.type === 'Identifier')

    expect(isIdentifier(node)).toBe(true)
  })

  it('should return false for a Literal node', () => {
    const code = 'let foo = 0'
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      range: true,
    })

    const node = selectNode(ast, (node): node is TSESTree.Literal => node.type === 'Literal')
    expect(isIdentifier(node)).toBe(false)
  })

  it('should return false for a CallExpression node', () => {
    const code = 'foo()'
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      range: true,
    })

    const node = selectNode(ast, (node): node is TSESTree.CallExpression => node.type === 'CallExpression')
    expect(isIdentifier(node)).toBe(false)
  })
})

describe('isLiteral', () => {
  it('should return true for a Literal node', () => {
    const code = 'let foo = 0'
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      range: true,
    })

    const node = selectNode(ast, (node): node is TSESTree.Literal => node.type === 'Literal')
    expect(isLiteral(node)).toBe(true)
  })

  it('should return false for an Identifier node', () => {
    const code = 'let foo = 0'
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      range: true,
    })

    const node = selectNode(ast, (node): node is TSESTree.Identifier => node.type === 'Identifier')
    expect(isLiteral(node)).toBe(false)
  })

  it('should return false for a CallExpression node', () => {
    const code = 'foo()'
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      range: true,
    })

    const node = selectNode(ast, (node): node is TSESTree.CallExpression => node.type === 'CallExpression')
    expect(isLiteral(node)).toBe(false)
  })
})

describe('isFunctionDeclaration', () => {
  it('should return true for a FunctionDeclaration node', () => {
    const code = 'function foo() {}'
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      range: true,
    })

    const node = selectNode(ast, (node): node is TSESTree.FunctionDeclaration => node.type === 'FunctionDeclaration')
    expect(isFunctionDeclaration(node)).toBe(true)
  })

  it('should return false for an Identifier node', () => {
    const code = 'let foo = 0'
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      range: true,
    })

    const node = selectNode(ast, (node): node is TSESTree.FunctionDeclaration => node.type === 'FunctionDeclaration')
    expect(isFunctionDeclaration(node)).toBe(false)
  })

  it('should return false for a CallExpression node', () => {
    const code = 'foo()'
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      range: true,
    })

    const node = selectNode(ast, (node): node is TSESTree.FunctionDeclaration => node.type === 'FunctionDeclaration')
    expect(isFunctionDeclaration(node)).toBe(false)
  })
})

describe('isFunctionExpression', () => {
  it('should return true for a FunctionExpression node', () => {
    const code = 'const fn = function foo() {}'
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      range: true,
    })

    const node = selectNode(ast, (node): node is TSESTree.FunctionExpression => node.type === 'FunctionExpression')
    expect(isFunctionExpression(node)).toBe(true)
  })

  it('should return false for an Identifier node', () => {
    const code = 'let foo = 0'
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      range: true,
    })

    const node = selectNode(ast, (node): node is TSESTree.Identifier => node.type === 'Identifier')
    expect(isFunctionExpression(node)).toBe(false)
  })

  it('should return false for a CallExpression node', () => {
    const code = 'foo()'
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      range: true,
    })

    const node = selectNode(ast, (node): node is TSESTree.CallExpression => node.type === 'CallExpression')
    expect(isFunctionExpression(node)).toBe(false)
  })
})

describe('isThrowStatement', () => {
  it('should return true for a ThrowStatement node', () => {
    const code = 'throw new Error()'
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      range: true,
    })

    const node = selectNode(ast, (node): node is TSESTree.ThrowStatement => node.type === 'ThrowStatement')
    expect(isThrowStatement(node)).toBe(true)
  })

  it('should return false for an Identifier node', () => {
    const code = 'let foo = 0'
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      range: true,
    })

    const node = selectNode(ast, (node): node is TSESTree.Identifier => node.type === 'Identifier')
    expect(isThrowStatement(node)).toBe(false)
  })

  it('should return false for a CallExpression node', () => {
    const code = 'foo()'
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      range: true,
    })

    const node = selectNode(ast, (node): node is TSESTree.CallExpression => node.type === 'CallExpression')
    expect(isThrowStatement(node)).toBe(false)
  })
})

describe('isReturnStatement', () => {
  it('should return true for a ReturnStatement node', () => {
    const code = 'function foo() { return 42; }'
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      range: true,
    })

    const node = selectNode(ast, (node): node is TSESTree.ReturnStatement => node.type === 'ReturnStatement')
    expect(isReturnStatement(node)).toBe(true)
  })

  it('should return false for an Identifier node', () => {
    const code = 'let x = 42;'
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      range: true,
    })

    const node = selectNode(ast, (node): node is TSESTree.Identifier => node.type === 'Identifier')
    expect(isReturnStatement(node)).toBe(false)
  })

  it('should return false for a CallExpression node', () => {
    const code = 'console.log("Hello, world!");'
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      range: true,
    })

    const node = selectNode(ast, (node): node is TSESTree.CallExpression => node.type === 'CallExpression')
    expect(isReturnStatement(node)).toBe(false)
  })
})

describe('isVariableDeclaration', () => {
  it('should return true for a VariableDeclaration node', () => {
    const code = 'let foo = 0'
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      range: true,
    })

    const node = selectNode(ast, (node): node is TSESTree.VariableDeclaration => node.type === 'VariableDeclaration')
    expect(isVariableDeclaration(node)).toBe(true)
  })

  it('should return false for an Identifier node', () => {
    const code = 'let foo = 0'
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      range: true,
    })

    const node = selectNode(ast, (node): node is TSESTree.Identifier => node.type === 'Identifier')
    expect(isVariableDeclaration(node)).toBe(false)
  })

  it('should return false for a CallExpression node', () => {
    const code = 'foo()'
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: 'module',
      range: true,
    })

    const node = selectNode(ast, (node): node is TSESTree.CallExpression => node.type === 'CallExpression')
    expect(isVariableDeclaration(node)).toBe(false)
  })
})
