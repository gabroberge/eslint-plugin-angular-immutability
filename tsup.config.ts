import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["cjs", "esm"],
	dts: {
		// tsup always sets baseUrl for the DTS rollup; TS 6 deprecates baseUrl (TS5101).
		compilerOptions: {
			ignoreDeprecations: '6.0',
		},
	},
	clean: true,
	external: ["@typescript-eslint/utils", "eslint", "typescript"],
	splitting: false,
	treeshake: true,
	minify: true,
	sourcemap: false,
});
