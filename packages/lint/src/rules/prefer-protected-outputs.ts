import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleFix, RuleFixer, RuleModule } from "@typescript-eslint/utils/ts-eslint";

import { createESLintRule } from "../utils/create-eslint-rule";
import type { RuleDocs } from "../utils/create-eslint-rule";

export type MessageIds = "preferProtectedOutput" | "suggestAddProtectedModifier";
export type Options = [];

export const RULE_NAME = "prefer-protected-outputs";

const preferProtectedOutputs: RuleModule<MessageIds, Options, RuleDocs> = createESLintRule<
	Options,
	MessageIds
>({
	create(context) {
		function fix(
			accessibility: string,
			fixer: RuleFixer,
			node: TSESTree.PropertyDefinition
		): RuleFix | null {
			if (node.accessibility === "public") {
				const publicToken = context.sourceCode.getFirstToken(node, {
					filter: (token) => token.value === "public"
				});

				if (publicToken !== null) {
					return fixer.replaceText(publicToken, "protected");
				}
			}

			if (node.accessibility === "private") {
				const privateToken = context.sourceCode.getFirstToken(node, {
					filter: (token) => token.value === "private"
				});

				if (privateToken !== null) {
					return fixer.replaceText(privateToken, "protected");
				}
			}

			const prefix = `${accessibility} `;
			const tokens = context.sourceCode.getTokens(node);
			const readonlyToken = tokens.find((token) => token.value === "readonly");

			if (readonlyToken !== undefined) {
				return fixer.insertTextBefore(readonlyToken, "protected ");
			}

			return fixer.insertTextBefore(node, prefix);
		}

		function report(key: TSESTree.Node, type: string): void {
			const property = key.parent;
			if (property?.type !== AST_NODE_TYPES.PropertyDefinition) {
				return;
			}

			context.report({
				data: { type },
				messageId: "preferProtectedOutput",
				node: key,
				suggest: [
					{
						fix: (fixer): RuleFix | null => {
							const accessibility = property.readonly ? "protected readonly" : "protected";
							return fix(accessibility, fixer, property);
						},
						messageId: "suggestAddProtectedModifier"
					}
				]
			});
		}

		return {
			[`PropertyDefinition:not([accessibility=protected]):matches([typeAnnotation.typeAnnotation.typeName.name=OutputEmitterRef], [value.callee.name=output])`]({
				key
			}: TSESTree.PropertyDefinition) {
				report(key, "OutputEmitterRef");
			}
		};
	},
	meta: {
		defaultOptions: [],
		docs: {
			description:
				"Prefer to declare @Output and OutputEmitterRef as protected since they should not be exposed directly"
		},
		hasSuggestions: true,
		messages: {
			preferProtectedOutput:
				"Prefer to declare `{{type}}` as `protected` since it should not be exposed directly",
			suggestAddProtectedModifier: "Add `protected` modifier"
		},
		schema: [],
		type: "suggestion"
	},
	name: RULE_NAME
});

export default preferProtectedOutputs;
