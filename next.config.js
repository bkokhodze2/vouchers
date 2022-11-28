/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode:true,
	swcMinify:true,
	i18n:{
		locales:['eng'],
		defaultLocale:'eng',
	},
	images:{
		domains:['www.google.com','http://s3.pirveli.ge',"https://s3.pirveli.ge"],
		remotePatterns:[
			{
				protocol:'http',
				hostname:'s3.pirveli.ge',
				pathname:'/v1/api/**',
			},
		],
		formats:['image/avif','image/webp'],
	},
	env:{
		// for local
		//baseApi:"http://accounting.pirveli.ge/api/racoon-transactions",

		// for server
		baseApi:"https://vouchers.pirveli.ge/api/racoon-transactions",
	}
}

module.exports = nextConfig