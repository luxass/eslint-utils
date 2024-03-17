import type {
  RuleListener,
  RuleWithMeta,
  RuleWithMetaAndName,
} from '@typescript-eslint/utils/eslint-utils'
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint'
import type { Rule } from 'eslint'

export interface RuleModule<T extends readonly unknown[]>
  extends Rule.RuleModule {
  defaultOptions: T
}

/**
 * Creates reusable function to create rules with default options and docs URLs.
 *
 * @param urlCreator Creates a documentation URL for a given rule name.
 * @returns Function to create a rule with the docs URL format.
 */
function RuleCreator(urlCreator: (ruleName: string) => string): <TOptions extends readonly unknown[], TMessageIds extends string>({ name, meta, ...rule }: Readonly<RuleWithMetaAndName<TOptions, TMessageIds>>) => RuleModule<TOptions> {
  // This function will get much easier to call when this is merged https://github.com/Microsoft/TypeScript/pull/26349
  // TODO - when the above PR lands; add type checking for the context.report `data` property
  return function createNamedRule<
    TOptions extends readonly unknown[],
    TMessageIds extends string,
  >({
    name,
    meta,
    ...rule
  }: Readonly<
    RuleWithMetaAndName<TOptions, TMessageIds>
  >): RuleModule<TOptions> {
    return createRule<TOptions, TMessageIds>({
      meta: {
        ...meta,
        docs: {
          ...meta.docs,
          url: urlCreator(name),
        },
      },
      ...rule,
    })
  }
}

/**
 * Creates a well-typed TSESLint custom ESLint rule without a docs URL.
 *
 * @returns Well-typed TSESLint custom ESLint rule.
 * @remarks It is generally better to provide a docs URL function to RuleCreator.
 */
function createRule<
  TOptions extends readonly unknown[],
  TMessageIds extends string,
>({
  create,
  defaultOptions,
  meta,
}: Readonly<RuleWithMeta<TOptions, TMessageIds>>): RuleModule<TOptions> {
  return {
    create: ((
      context: Readonly<RuleContext<TMessageIds, TOptions>>,
    ): RuleListener => {
      const optionsWithDefault = context.options.map((options, index) => {
        return {
          ...(defaultOptions[index] || {}),
          ...(options || {}),
        }
      }) as unknown as TOptions
      return create(context, optionsWithDefault)
    }) as any,
    defaultOptions,
    meta: meta as any,
  }
}

/**
 * Creates an ESLint rule with a default options and a docs URL.
 *
 * @param {string} name The name of the ESLint rule.
 */
export const createEslintRule: <TOptions extends readonly unknown[], TMessageIds extends string>({ name, meta, ...rule }: Readonly<RuleWithMetaAndName<TOptions, TMessageIds>>) => RuleModule<TOptions> = RuleCreator((ruleName) => ruleName) as any as <
  TOptions extends readonly unknown[],
  TMessageIds extends string,
>({
  name,
  meta,
  ...rule
}: Readonly<RuleWithMetaAndName<TOptions, TMessageIds>>) => RuleModule<TOptions>

/**
 * Creates an ESLint rule builder.
 * @param {string} docsUrl The URL of the documentation for the ESLint rule.
 * @returns A function that creates an ESLint rule with the provided documentation URL.
 */
export function createESLintRuleBuilder(docsUrl: string): typeof createEslintRule {
  return RuleCreator((ruleName) => `${docsUrl}/${ruleName}`)
}
