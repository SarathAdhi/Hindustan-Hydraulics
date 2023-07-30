/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	env: {
		SERVER_BASE_URL: process.env.SERVER_BASE_URL,
	},
};

module.exports = nextConfig;
