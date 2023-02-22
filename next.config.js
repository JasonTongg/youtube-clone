/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ytimg.com', 'yt3.ggpht.com'],
  },
  env: {
    API_KEY: 'AIzaSyCsQUMUDOkkJp-el3v5QU8RD6XEjYaKXT4',
  },
};

module.exports = nextConfig;
