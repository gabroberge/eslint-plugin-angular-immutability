import type { UserConfig } from "tsdown";
import { defineConfig } from "tsdown";

const config: UserConfig = defineConfig({
	clean: true,
	deps: {
		neverBundle: ["typescript", "eslint", /^@typescript-eslint\//]
	},
	dts: true,
	entry: ["src/index.ts"],
	format: ["esm", "cjs"]
});

export default config;
