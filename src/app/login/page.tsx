/*
 * @Author: wangtong wangtong@chukong-inc.com
 * @Date: 2025-09-28 16:56:21
 * @LastEditors: wangtong wangtong@chukong-inc.com
 * @LastEditTime: 2025-10-13 18:04:09
 * @FilePath: /my-next-app/src/app/about/page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
"use client";
import { loginApi } from "@/services";
import styles from "./page.module.scss";
import { Form, Input, Button, Checkbox, message, Tooltip } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
type ValueType = {
    username: string;
    password: string;
    passwordAgain?: string;
};
export default function Login() {
    const router = useRouter();
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [errorCode, setErrorCode] = useState<number>(0);
    const [form] = Form.useForm();
    const [errorMsg, setErrorMsg] = useState<ValueType>({
        username: "",
        password: "",
        passwordAgain: "",
    });

    const submit = (values: ValueType) => {
        const { username, password, passwordAgain } = values;
        if (!username) {
            setErrorMsg({ ...errorMsg, username: " 账号! 账号啊！你在登空气嘛？" });
            return;
        }
        if (!password) {
            setErrorMsg({ ...errorMsg, password: "密码滴 懂？" });
            return;
        }
        if (!isRegisterMode) {
            loginApi
                .login(values)
                .then((res) => {
                    if (res.code === 0) {
                        messageApi.success("登录成功");
                        router.push("/");
                        clearErrorMsg();
                        form.setFieldsValue({ password: "" });
                    }
                })
                .catch((error) => {
                    const { code } = error.data;
                    const errorInfo = { username: "", password: "" };
                    setErrorCode(code);
                    switch (code) {
                        case 100104:
                            errorInfo.username = "用户不存在？看右下角那个一闪一闪的是啥！！";
                            break;
                        case 100105:
                            errorInfo.password = "密码错误";
                            break;
                        default:
                            break;
                    }
                    setErrorMsg(errorInfo);
                });
            return;
        }

        if (!passwordAgain) {
            setErrorMsg({ ...errorMsg, passwordAgain: "密码再来一遍！！" });
            return;
        }
        if (passwordAgain !== password) {
            setErrorMsg({ ...errorMsg, passwordAgain: "第二次密码都记不住，你也配进这个网站！！！" });
            return;
        }

        if (username.length < 3 || username.length > 16) {
            setErrorMsg({ ...errorMsg, username: "用户名字符数不能小于3或大于16" });
            return;
        }
        if (password.length < 6) {
            setErrorMsg({ ...errorMsg, password: "密码字符数不能小于6" });
            return;
        }
        loginApi
            .register(values)
            .then((res) => {
                if (res.code === 0) {
                    messageApi.success("注册成功");
                    clearErrorMsg();
                    form.setFieldsValue({ password: "", passwordAgain: "" });
                    setIsRegisterMode(false);
                }
            })
            .catch((error) => {
                const { code } = error.data;
                const errorInfo = { username: "", password: "", passwordAgain: "" };
                switch (code) {
                    case 100103:
                        errorInfo.username = "用户已存在";
                        break;

                    default:
                        break;
                }
                setErrorMsg(errorInfo);
            });
    };

    const goRegister = () => {
        setIsRegisterMode(true);
        setErrorCode(0);
        clearErrorMsg();
    };

    const clearErrorMsg = () => {
        setErrorMsg({ username: "", password: "", passwordAgain: "" });
    };

    return (
        <div className={styles.wapper}>
            {contextHolder}
            <div className={styles.content}>
                <img src="/logo.png" alt="喵喵萌" />
                <Form name="login" form={form} style={{ maxWidth: 600 }} onFinish={submit} autoComplete="off" size="large">
                    <Form.Item name="username" validateStatus={errorMsg.username ? "error" : ""} help={errorMsg.username}>
                        <Input placeholder="账号（account）" allowClear onInput={(e) => {setErrorMsg({ ...errorMsg, username: "" });setErrorCode(0);}} />
                    </Form.Item>

                    <Form.Item name="password" validateStatus={errorMsg.password ? "error" : ""} help={errorMsg.password}>
                        <Input.Password placeholder="密码（password）" allowClear onInput={(e) => setErrorMsg({ ...errorMsg, password: "" })} />
                    </Form.Item>
                    {isRegisterMode && (
                        <Form.Item name="passwordAgain" validateStatus={errorMsg.passwordAgain ? "error" : ""} help={errorMsg.passwordAgain}>
                            <Input.Password
                                placeholder="二次确认密码（password again）"
                                allowClear
                                onInput={(e) => setErrorMsg({ ...errorMsg, passwordAgain: "" })}
                            />
                        </Form.Item>
                    )}
                    {!isRegisterMode && (
                        <Form.Item name="remember" valuePropName="checked" style={{ padding: "0 2px" }}>
                            <div className={styles["space-between"]}>
                                <Tooltip
                                    placement="topLeft"
                                    color="#9254de"
                                    title={"想什么呢？你选了也不会帮你记的，只有能记住密码的强者才有资格进入这个网站！！"}>
                                    <Checkbox defaultChecked={false}>记住密码</Checkbox>
                                </Tooltip>
                                <span className={styles["register-button"] + (errorCode === 100104 ? " " + styles.twinkle : "")} onClick={goRegister}>
                                    注册
                                </span>
                            </div>
                        </Form.Item>
                    )}
                    <Form.Item style={{ textAlign: "center" }}>
                        {isRegisterMode && (
                            <Button
                                type="default"
                                htmlType="button"
                                onClick={(e) => {
                                    setIsRegisterMode(false);
                                    clearErrorMsg();
                                    e.preventDefault();
                                }}
                                style={{ marginRight: 20 }}>
                                取消
                            </Button>
                        )}
                        <Button type="primary" htmlType="submit">
                            {isRegisterMode ? "注册" : "登录"}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
