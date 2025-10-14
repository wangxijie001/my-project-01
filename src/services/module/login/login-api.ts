/*
 * @Author: wangtong wangtong@chukong-inc.com
 * @Date: 2025-10-10 15:43:41
 * @LastEditors: wangtong wangtong@chukong-inc.com
 * @LastEditTime: 2025-10-13 16:29:14
 * @FilePath: /my-next-app/src/services/module/login/login-api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ResType } from "@/services";
import  request  from "../../http";
import { ValueType } from "./type";

const loginApi = {
  register: (values: ValueType): Promise<ResType<unknown>> => {
    return request.post('api/login/register', values);
  },
  login: (values: ValueType): Promise<ResType<unknown>> => {
    return request.post('api/login/signin', values);
  }
}
export default loginApi;