/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build to plain static files in ./out so Firebase Hosting (free Spark plan) can serve them.
  output: 'export',
  // Static hosting has no image optimisation server.
  images: { unoptimized: true },
};

export default nextConfig;
