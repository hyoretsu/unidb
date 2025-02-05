import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

type NextConfigFn = (phase: string, options: { defaultConfig: NextConfig }) => NextConfig;

const configFn: NextConfigFn = async (phase, { defaultConfig }) => {
	const baseConf: NextConfig = {
		eslint: {
			ignoreDuringBuilds: true,
		},
		output: "export",
		productionBrowserSourceMaps: true,
		reactStrictMode: true,
		sassOptions: {
			logger: {
				warn: (message: string) => console.warn(message),
				debug: (message: string) => console.log(message),
			},
			silenceDeprecations: ["legacy-js-api"],
		},
		typescript: {
			ignoreBuildErrors: true,
		},
	};

	// Dev-specific settings
	if (phase === PHASE_DEVELOPMENT_SERVER) {
		Object.assign(baseConf, {
			assetPrefix: `http://${process.env.TAURI_DEV_HOST || "localhost"}:3000`,
		});
	} else {
		Object.assign(baseConf, {});
	}

	return baseConf;
};

export default configFn;
