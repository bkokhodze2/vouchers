/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode:true,
	swcMinify:true,
	i18n:{
		locales:['eng'],
		defaultLocale:'eng',
	},
	images:{
		domains:['www.google.com','http://s3.pirveli.com',"https://s3.pirveli.com"],
		remotePatterns:[
			{
				protocol:'http',
				hostname:'s3.pirveli.com',
				pathname:'/v1/api/**',
			},
		],
		formats:['image/avif','image/webp'],
	},
	env:{
		// for local
		// baseApi:"http://accounting.pirveli.com/api/racoon-transactions",

		// for server
		baseApi:"https://vouchers.pirveli.com/api/racoon-transactions",
	}
}

module.exports = nextConfig