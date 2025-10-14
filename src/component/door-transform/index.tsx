/*
 * @Author: wangtong wangtong@chukong-inc.com
 * @Date: 2025-10-14 09:36:45
 * @LastEditors: wangtong wangtong@chukong-inc.com
 * @LastEditTime: 2025-10-14 17:31:36
 * @FilePath: /my-next-app/src/component/door-transform/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import styles from "./index.module.scss";

export default function DoorTransform() {
    const account = ["q", "w", "e", "0", "0", "1"].reverse();

    const generateRandomCharsArray = (length: number, first: string) => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
        let result = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            result += chars.charAt(randomIndex);
        }
        result = first + result.slice(1);
        console.log(result);
        return result.split("");
    };
    return (
        <main className={styles.wapper}>
            <div className={styles.top}>
                <div>
                    {account.map((item, index) => {
                        const itemWidth = (((index + 1) * 100) / account.length).toFixed(0) + "%";
                        const itemInfo = generateRandomCharsArray((index + 1) * 4, item);
                        const itemDelay = (((account.length - index) * 3) / account.length).toFixed(2) + "s";
                        const spinStyle: React.CSSProperties & { [key: string]: string } = {
                            width: itemWidth,
                            height: itemWidth,
                            "--duration": itemDelay,
                        };
                        return (
                            <div key={item} className={styles.spin} style={spinStyle}>
                                {itemInfo.map((infoItem, infoIndex) => {
                                    const itemRotate = ((infoIndex * 360) / itemInfo.length).toFixed(0) + "deg";
                                    return (
                                        <span style={{ transform: `rotate(${itemRotate})` }} key={infoItem + infoIndex}>
                                            {infoItem}
                                        </span>
                                    );
                                })}
                                <span>{item}</span>
                            </div>
                        );
                    })}
                    <span className={styles.mark}></span>
                </div>
            </div>
            <div className={styles.bottom}>
                <div></div>
            </div>
        </main>
    );
}
