/*
 * @Author: wangtong wangtong@chukong-inc.com
 * @Date: 2025-09-24 17:39:47
 * @LastEditors: wangtong wangtong@chukong-inc.com
 * @LastEditTime: 2025-10-13 16:08:18
 * @FilePath: /my-next-app/src/app/layout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { customAntdVar } from "@/styles/custom-antd-var";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "喵喵盟",
  description: "测试站点"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ConfigProvider
          theme={{
            // 启用并自定义主题
            cssVar: true,
            token: customAntdVar,
          }}
        >
          <AntdRegistry >{children}</AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
