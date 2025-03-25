/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID + ".supabase.co"],
  },
};

export default nextConfig;
