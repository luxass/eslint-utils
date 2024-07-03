# eslint-utils

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

ESlint utilities

## 📦 Installation

```sh
npm install @luxass/eslint-utils
```

## 📚 Usage

```ts
import { createESLintRuleBuilder, createEslintRule } from "@luxass/eslint-utils";

const createESLintRule = createEslintRuleBuilder("https://github.com/luxass/eslint-plugin-overdrive/blob/main/src/rules/$RULE_NAME.md");

const preferNothing = createESLintRule<[], "preferNothing">({
  name: "preferNothing",
  meta: {
    type: "suggestion",
    docs: {
      description: "Prefer nothing",
      recommended: "error",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      Program(node) {
        context.report({
          node,
          messageId: "preferNothing",
        });
      },
    };
  },
  messages: {
    preferNothing: "Prefer nothing",
  },
});
// the rule will now have the following docs url "https://github.com/luxass/eslint-plugin-overdrive/blob/main/src/rules/prefer-nothing.md"
```

## 📄 License

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@luxass/eslint-utils?style=flat&colorA=18181B&colorB=4169E1
[npm-version-href]: https://npmjs.com/package/@luxass/eslint-utils
[npm-downloads-src]: https://img.shields.io/npm/dm/@luxass/eslint-utils?style=flat&colorA=18181B&colorB=4169E1
[npm-downloads-href]: https://npmjs.com/package/@luxass/eslint-utils
