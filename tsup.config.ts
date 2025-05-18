import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["cjs", "esm"],
	dts: true,
	clean: true,
	external: ["@typescript-eslint/utils", "eslint", "typescript"],
	splitting: false,
	treeshake: true,
	minify: true,
	sourcemap: false,
});
