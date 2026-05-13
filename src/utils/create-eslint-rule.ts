import { ESLintUtils } from "@typescript-eslint/utils";
import type { RuleWithMetaAndName } from "@typescript-eslint/utils/eslint-utils";
import type {
	RuleContext,
	RuleListener,
	RuleModule,
} from "@typescript-eslint/utils/ts-eslint";

export interface RuleDocs {
	recommended?: string;
}

type RuleModuleWithName<
	MessageIds extends string,
	Options extends readonly unknown[],
	PluginDocs,
> = RuleModule<MessageIds, Options, PluginDocs, RuleListener> & {
	name: string;
};

const ruleCreatorFn: typeof ESLintUtils.RuleCreator = <PluginDocs = unknown>(
	urlCreator: (ruleName: string) => string,
) => {
	return function createRule<
		Options extends readonly unknown[],
		MessageIds extends string,
	>({
		name,
		meta,
		defaultOptions,
		create,
	}: Readonly<RuleWithMetaAndName<Options, MessageIds, PluginDocs>>): RuleModuleWithName<
		MessageIds,
		Options,
		PluginDocs
	> {
		const resolvedDefaultOptions = (meta.defaultOptions ??
			defaultOptions ??
			[]) as Readonly<Options>;

		return {
			name,
			meta: Object.assign(Object.assign({}, meta), {
				docs: Object.assign(Object.assign({}, meta.docs), {
					url: urlCreator(name),
				}),
			}),
			...(defaultOptions !== undefined ? { defaultOptions } : {}),
			create(context: Readonly<RuleContext<MessageIds, Options>>): RuleListener {
				const optionsWithDefault = ESLintUtils.applyDefault(
					resolvedDefaultOptions,
					context.options,
				);
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
