import type { TSESTree } from "@typescript-eslint/utils";
import { createESLintRule } from "../utils/create-eslint-rule";

export type MessageIds = "preferImmutableResource" | "suggestAddReadonlyModifier";
export type Options = [];

export const RULE_NAME = "prefer-immutable-resource";

export default createESLintRule<Options, MessageIds>({
	name: RULE_NAME,
	meta: {
		type: "suggestion",
		docs: {
			description: "Prefer to declare resources as readonly since they should not be mutated",
		},
		hasSuggestions: true,
		schema: [],
		messages: {
			preferImmutableResource: "Prefer to declare `{{type}}` as `readonly` since they should not be mutated",
			suggestAddReadonlyModifier: "Add `readonly` modifier",
		},
	},
	defaultOptions: [],
	create(context) {
		return {
			[`PropertyDefinition:not([readonly=true]):matches([typeAnnotation.typeAnnotation.typeName.name=ResourceRef], [value.callee.name=resource], [value.callee.name=rxResource])`]({
				key,
			}: TSESTree.PropertyDefinition) {
				report(key, "ResourceRef");
			},
		};

		function report(key: TSESTree.Node, type: string) {
			context.report({
				node: key,
				messageId: "preferImmutableResource",
				data: { type },
				suggest: [
					{
						messageId: "suggestAddReadonlyModifier",
						fix: (fixer) => fixer.insertTextBefore(key, "readonly "),
					},
				],
			});
		}
	},
});
