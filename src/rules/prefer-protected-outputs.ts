import type { TSESLint, TSESTree } from "@typescript-eslint/utils";
import { createESLintRule } from "../utils/create-eslint-rule";

export type MessageIds = "preferProtectedOutput" | "suggestAddProtectedModifier";
export type Options = [];

export const RULE_NAME = "prefer-protected-outputs";

export default createESLintRule<Options, MessageIds>({
	name: RULE_NAME,
	meta: {
		type: "suggestion",
		docs: {
			description:
				"Prefer to declare @Output and OutputEmitterRef as protected since they should not be exposed directly",
		},
		hasSuggestions: true,
		schema: [],
		messages: {
			preferProtectedOutput:
				"Prefer to declare `{{type}}` as `protected` since it should not be exposed directly",
			suggestAddProtectedModifier: "Add `protected` modifier",
		},
	},
	defaultOptions: [],
	create(context) {
		return {
			[`PropertyDefinition:not([accessibility=protected]):matches([typeAnnotation.typeAnnotation.typeName.name=OutputEmitterRef], [value.callee.name=output])`]({
				key,
			}: TSESTree.PropertyDefinition) {
				report(key, "OutputEmitterRef");
			},
		};

		function fix(
			accessibility: string,
			fixer: TSESLint.RuleFixer,
			node: TSESTree.PropertyDefinition
		): TSESLint.RuleFix | null {
			if (node.accessibility === "public") {
				const publicToken = context.sourceCode.getFirstToken(node, {
					filter: (token) => token.value === "public",
				});

				if (publicToken) {
					return fixer.replaceText(publicToken, "protected");
				}
			}

			if (node.accessibility === "private") {
				const privateToken = context.sourceCode.getFirstToken(node, {
					filter: (token) => token.value === "private",
				});

				if (privateToken) {
					return fixer.replaceText(privateToken, "protected");
				}
			}

			const prefix = `${accessibility} `;
			const tokens = context.sourceCode.getTokens(node);
			const readonlyToken = tokens.find((token) => token.value === "readonly");

			if (readonlyToken) {
				return fixer.insertTextBefore(readonlyToken, "protected ");
			}

			return fixer.insertTextBefore(node, prefix);
		}

		function report(key: TSESTree.Node, type: string) {
			context.report({
				node: key,
				messageId: "preferProtectedOutput",
				data: { type },
				suggest: [
					{
						messageId: "suggestAddProtectedModifier",
						fix: (fixer) => {
							const accessibility = (key as any).readonly ? "protected readonly" : "protected";
							return fix(accessibility, fixer, key.parent as TSESTree.PropertyDefinition);
						},
					},
				],
			});
		}
	},
});
