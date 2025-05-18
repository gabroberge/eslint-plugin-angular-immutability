import { ESLintUtils } from "@typescript-eslint/utils";

export interface RuleDocs {
	recommended?: string;
}

const ruleCreatorFn: typeof ESLintUtils.RuleCreator = (urlCreator) => {
	return function createRule({ name, meta, defaultOptions, create }) {
		return {
			meta: Object.assign(Object.assign({}, meta), {
				docs: Object.assign(Object.assign({}, meta.docs), {
					url: urlCreator(name),
				}),
			}),
			defaultOptions,
			create(context) {
				const optionsWithDefault = ESLintUtils.applyDefault(defaultOptions, context.options);
				return create(context, optionsWithDefault);
			},
		};
	};
};

ruleCreatorFn.withoutDocs = ESLintUtils.RuleCreator.withoutDocs;

export const createESLintRule = ruleCreatorFn<RuleDocs>(
	(ruleName) =>
		`https://github.com/gabroberge/eslint-plugin-angular-immutability/blob/master/docs/rules/${ruleName}.md`
);
