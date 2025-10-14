/*
 * @Author: wangtong wangtong@chukong-inc.com
 * @Date: 2025-09-28 16:56:21
 * @LastEditors: wangtong wangtong@chukong-inc.com
 * @LastEditTime: 2025-09-28 17:38:29
 * @FilePath: /my-next-app/src/app/about/page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import styles from "./page.module.scss";

export default function Home() {

  const list = [1,2,3,4,5,6,7,8,9,10];
  return (
    <div className={styles.wapper}>
      测试一下页面
      {
        list.map((item) => (
          <span key={item}>
            {item}
          </span>
        ))
      }
    </div>
  );
}
