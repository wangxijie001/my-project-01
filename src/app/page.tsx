/*
 * @Author: wangtong wangtong@chukong-inc.com
 * @Date: 2025-09-24 17:39:47
 * @LastEditors: wangtong wangtong@chukong-inc.com
 * @LastEditTime: 2025-10-14 09:42:09
 * @FilePath: /next_project/my-next-app/src/app/page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
"use client"
import styles from "./page.module.scss";
import { useRouter } from 'next/navigation'
import DoorTransform from "@/component/door-transform";

export default function Home() {
  const router = useRouter()
  return (
        <main className={styles.wapper}>
        <div className={styles.left}>

        </div>
        <div className={styles.right}>
          <div className={styles.top}>首页</div>
          <div className={styles.middle}>
            
          </div>
          <div className={styles.bottom}>

          </div>
        </div>
        <DoorTransform />
    </main>
  );
}
