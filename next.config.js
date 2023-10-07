/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "firebasestorage.googleapis.com",
            "lh3.googleusercontent.com",
            "res.cloudinary.com"
        ],
    },
};

module.exports = nextConfig;
