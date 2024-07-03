import { analyze } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/typescript-estree";
import { parse } from "@typescript-eslint/typescript-estree";
import { describe, expect, it } from "vitest";
import { getDeclaredVariable, getDeclaredVariables, getReturnedVariable } from "../src/variables";
import { selectNode } from "./utils";

describe("getReturnedVariable", () => {
  it("should return the identifier of the returned variable", () => {
    const code = "function foo() { return bar; }";
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: "module",
      range: true,
    });

    const node = selectNode(ast, (node): node is TSESTree.BlockStatement => node.type === "BlockStatement");

    const returnedVariable = getReturnedVariable(node!.body.at(-1)!);

    expect(node).toBeDefined();
    expect(returnedVariable).toBeDefined();
    expect(returnedVariable?.name).toBe("bar");
  });

  it("should return undefined if there is no return statement", () => {
    const code = "function foo() { console.log(\"Hello\"); }";
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: "module",
      range: true,
    });

    const node = selectNode(ast, (node): node is TSESTree.BlockStatement => node.type === "BlockStatement");

    const returnedVariable = getReturnedVariable(node!.body.at(-1)!);

    expect(node).toBeDefined();
    expect(returnedVariable).toBeUndefined();
  });

  it("should return undefined if the return statement does not have an identifier", () => {
    const code = "function foo() { return 42; }";
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: "module",
      range: true,
    });

    const node = selectNode(ast, (node): node is TSESTree.BlockStatement => node.type === "BlockStatement");

    const returnedVariable = getReturnedVariable(node!.body.at(-1)!);

    expect(node).toBeDefined();
    expect(returnedVariable).toBeUndefined();
  });
});

describe("getDeclaredVariable", () => {
  it("should return the declared variable", () => {
    const code = "const foo = 42;";
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: "module",
      range: true,
    });

    const node = selectNode(ast, (node): node is TSESTree.Statement => node.type === "VariableDeclaration");

    const declaredVariable = getDeclaredVariable(node!);

    expect(node).toBeDefined();
    expect(declaredVariable).toBeDefined();
    expect(declaredVariable?.id.type === "Identifier" && declaredVariable.id.name).toBe("foo");
    expect(declaredVariable?.init?.type === "Literal" && declaredVariable.init.value).toBe(42);
  });

  it("should return undefined if the statement is not a variable declaration", () => {
    const code = "console.log(\"Hello\");";
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: "module",
      range: true,
    });

    const node = selectNode(ast, (node): node is TSESTree.Statement => node.type === "ExpressionStatement");

    const declaredVariable = getDeclaredVariable(node!);

    expect(node).toBeDefined();
    expect(declaredVariable).toBeUndefined();
  });

  it("should return undefined if the variable declaration has multiple declarators", () => {
    const code = "const foo = 42, bar = \"baz\";";
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: "module",
      range: true,
    });

    const node = selectNode(ast, (node): node is TSESTree.Statement => node.type === "VariableDeclaration");

    const declaredVariable = getDeclaredVariable(node!);

    expect(node).toBeDefined();
    expect(declaredVariable).toBeUndefined();
  });

  it("should return undefined if the variable declaration has a type annotation", () => {
    const code = "const foo: number = 42;";
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: "module",
      range: true,
    });

    const node = selectNode(ast, (node): node is TSESTree.Statement => node.type === "VariableDeclaration");

    const declaredVariable = getDeclaredVariable(node!);

    expect(node).toBeDefined();
    expect(declaredVariable).toBeUndefined();
  });

  it("should return undefined if the variable declaration does not have an initializer", () => {
    const code = "const foo;";
    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: "module",
      range: true,
    });

    const node = selectNode(ast, (node): node is TSESTree.Statement => node.type === "VariableDeclaration");

    const declaredVariable = getDeclaredVariable(node!);

    expect(node).toBeDefined();
    expect(declaredVariable).toBeUndefined();
  });
});

describe("getDeclaredVariables", () => {
  it("should return the declared variables in the given scope", () => {
    const code = `
      const foo = () => {
        const bar = 42;
        let baz = 'hello';
        var qux = true;
      }
    `;

    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: "module",
      range: true,
    });

    const node = selectNode(ast, (node): node is TSESTree.ArrowFunctionExpression => node.type === "ArrowFunctionExpression");

    const scope = analyze(ast, {
      sourceType: "module",
    });

    const currentScope = scope.acquire(node!);

    const declaredVariables = getDeclaredVariables(currentScope!);

    expect(node).toBeDefined();
    expect(declaredVariables).toHaveLength(3);
    expect(declaredVariables[0]!.name).toBe("bar");
    expect(declaredVariables[1]!.name).toBe("baz");
    expect(declaredVariables[2]!.name).toBe("qux");
  });

  it("should return an empty array if there are no declared variables in the given scope", () => {
    const code = `
      const foo = () => {
        console.log('Hello');
      }
    `;

    const ast = parse(code, {
      ecmaVersion: 2022,
      sourceType: "module",
      range: true,
    });

    const node = selectNode(ast, (node): node is TSESTree.ArrowFunctionExpression => node.type === "ArrowFunctionExpression");

    const scope = analyze(ast, {
      sourceType: "module",
    });

    const currentScope = scope.acquire(node!);

    const declaredVariables = getDeclaredVariables(currentScope!);

    expect(node).toBeDefined();
    expect(declaredVariables).toHaveLength(0);
  });
});
