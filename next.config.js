/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['www.google.com'],
		formats: ['image/avif', 'image/webp'],
	},
	env: {
		basePath: "http://accounting.pirveli.ge/api",
		// baseApi: "http://accounting.pirveli.ge/api/racoon-transactions",
		baseApi: "https://vouchers.pirveli.ge/api/racoon-transactions",
	}
}

module.exports = nextConfig
