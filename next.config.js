/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		swcPlugins: [["next-superjson-plugin", {}]],
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.googleusercontent.com",
			},
		],
		domains: ["avatars.githubusercontent.com", "res.cloudinary.com"],
	},
};

module.exports = nextConfig;
