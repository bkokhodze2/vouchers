/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['www.google.com'],
		formats: ['image/avif', 'image/webp'],
	},
	env: {
		//  baseApi: "https://vouchers.pirveli.ge/api/racoon-transactions", for local

		baseApi: "https://vouchers.pirveli.ge/api/racoon-transactions", //for server

	}
}

module.exports = nextConfig
