import { ESLintUtils } from "@typescript-eslint/utils";

export interface RuleDocs {
	recommended?: string;
}

export const createESLintRule: ReturnType<typeof ESLintUtils.RuleCreator<RuleDocs>> =
	ESLintUtils.RuleCreator<RuleDocs>(
		(ruleName) =>
			`https://github.com/gabroberge/eslint-plugin-angular-immutability/blob/master/docs/rules/${ruleName}.md`
	);
