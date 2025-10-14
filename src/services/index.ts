/*
 * @Author: wangtong wangtong@chukong-inc.com
 * @Date: 2025-10-10 15:41:54
 * @LastEditors: wangtong wangtong@chukong-inc.com
 * @LastEditTime: 2025-10-13 13:34:27
 * @FilePath: /my-next-app/src/services/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export { default as loginApi } from './module/login/login-api';

export type ResType<T> = {
  code: number;
  data: T;
  message: string;
}
