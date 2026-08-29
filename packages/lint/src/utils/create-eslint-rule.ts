import { RuleCreator } from "@typescript-eslint/utils/eslint-utils";

export interface RuleDocs {
	recommended?: string;
}

export const createESLintRule: ReturnType<typeof RuleCreator<RuleDocs>> = RuleCreator<RuleDocs>(
	(ruleName) =>
		`https://github.com/gabroberge/eslint-plugin-angular-immutability/blob/master/docs/rules/${ruleName}.md`
);
