declare module "eslint-config-biome" {
	// biome-ignore lint/correctness/noUnusedImports: bugged
	import type { Linter } from "eslint";

	const config: Linter.Config;

	export default config;
}
