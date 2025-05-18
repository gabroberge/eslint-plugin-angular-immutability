import type { Linter } from "@typescript-eslint/utils/ts-eslint";
import packageJson from "../package.json";

const plugin = {
	meta: {
		name: packageJson.name,
		version: packageJson.version,
	},
	configs: {},
	rules: {},
	processors: {},
} satisfies Linter.Plugin;

export default plugin;
