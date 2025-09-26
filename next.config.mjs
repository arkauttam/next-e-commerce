/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "e-commerce-api-gmz3.onrender.com",
                pathname: "/media/**",
            },
        ],
    },
};

export default nextConfig;
