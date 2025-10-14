/*
 * @Author: wangtong wangtong@chukong-inc.com
 * @Date: 2025-09-24 17:39:47
 * @LastEditors: wangtong wangtong@chukong-inc.com
 * @LastEditTime: 2025-10-11 10:00:18
 * @FilePath: /next_project/my-next-app/next.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: '.dist',
  compiler: { styledComponents: true },
  async rewrites() {
    const target = process.env.API_PROXY_TARGET ?? "http://miaomiaomeng.cn";
    const enableProxy =
      process.env.NODE_ENV !== "production" || process.env.ENABLE_API_PROXY === "true";

    if (!enableProxy) return [];

    return [
      {
        source: "/api/:path*",
        destination: `${target}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
