/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['www.google.com', 'http://s3.pirveli.ge', "https://s3.pirveli.ge"],
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 's3.pirveli.ge',
				port: '',
				pathname: '/v1/api/**',
			},
		],
		formats: ['image/avif', 'image/webp'],
	},
	env: {
		// for local
		// baseApi: "http://accounting.pirveli.ge/api/racoon-transactions",

		// for server
		baseApi: "https://vouchers.pirveli.ge/api/racoon-transactions",

	}
}

module.exports = nextConfig