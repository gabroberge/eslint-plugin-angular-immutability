import type { TSESTree } from "@typescript-eslint/types";
import type { RuleModule } from "@typescript-eslint/utils/ts-eslint";

import { createESLintRule } from "../utils/create-eslint-rule";
import type { RuleDocs } from "../utils/create-eslint-rule";

export type MessageIds = "preferImmutableResource" | "suggestAddReadonlyModifier";
export type Options = [];

export const RULE_NAME = "prefer-immutable-resource";

const preferImmutableResource: RuleModule<MessageIds, Options, RuleDocs> = createESLintRule<
	Options,
	MessageIds
>({
	create(context) {
		function report(key: TSESTree.Node, type: string): void {
			context.report({
				data: { type },
				messageId: "preferImmutableResource",
				node: key,
				suggest: [
					{
						fix: (fixer) => fixer.insertTextBefore(key, "readonly "),
						messageId: "suggestAddReadonlyModifier"
					}
				]
			});
		}

		return {
			[`PropertyDefinition:not([readonly=true]):matches([typeAnnotation.typeAnnotation.typeName.name=ResourceRef], [value.callee.name=resource], [value.callee.name=rxResource])`]({
				key
			}: TSESTree.PropertyDefinition) {
				report(key, "ResourceRef");
			}
		};
	},
	meta: {
		defaultOptions: [],
		docs: {
			description: "Prefer to declare resources as readonly since they should not be mutated"
		},
		hasSuggestions: true,
		messages: {
			preferImmutableResource: "Prefer to declare `{{type}}` as `readonly` since they should not be mutated",
			suggestAddReadonlyModifier: "Add `readonly` modifier"
		},
		schema: [],
		type: "suggestion"
	},
	name: RULE_NAME
});

export default preferImmutableResource;
