import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      { source: "/corpsim", destination: "/case-study/corpsim", permanent: false },
      { source: "/finmonitor", destination: "/case-study/deloitte-data-investigation", permanent: false },
      { source: "/playground", destination: "/builds", permanent: false },
      { source: "/visionlabs", destination: "/builds", permanent: false },
    ];
  },
};

export default nextConfig;
