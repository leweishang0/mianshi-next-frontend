"use client";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import BasicLayout from "@/layouts/basicLayout";
import React, {useCallback, useEffect} from "react";
import ACCESS_ENUM from "@/access/accessEnum";
import {getLoginUserUsingGet} from "@/api/userController";
import {Provider, useDispatch} from "react-redux";
import store, { AppDispatch } from "@/stores";
import {setLoginUser} from "@/stores/loginUser";
import AccessLayout from "@/access/AccessLayout";


/**
 * 全局初始化逻辑
 * @param children
 * @constructor
 */
const InitLayout: React.FC<
    Readonly<{
        children: React.ReactNode;
    }>
> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>();
    // 初始化全局用户状态
    const doInitLoginUser = useCallback(async () => {
        const res = await getLoginUserUsingGet();
        // const  res = {}
        if (res != null && res.data != null) {
            // 更新全局用户状态
            dispatch(setLoginUser(res.data));
        } else {
            // 仅用于测试
            // setTimeout(() => {
            //   const testUser = {
            //     userName: "测试登录",
            //     id: 1,
            //     userAvatar: "https://www.code-nav.cn/logo.png",
            //     userRole: ACCESS_ENUM.ADMIN
            //   };
            //   dispatch(setLoginUser(testUser));
            // }, 2000);
        }
    }, []);

    // 只执行一次
    useEffect(() => {
        doInitLoginUser().then();
    }, []);
    return children;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
            <Provider store={store}>
                <InitLayout>
                    <BasicLayout>
                        <AccessLayout>
                            {children}
                        </AccessLayout>
                    </BasicLayout>
                </InitLayout>
            </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
