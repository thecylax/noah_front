const { default: build } = require('next/dist/build')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mdbcdn.b-cdn.net',
                port: '',
                pathname: '/img/new/avatars/2.webp'
            },
        ],
    },
}

module.exports = nextConfig
