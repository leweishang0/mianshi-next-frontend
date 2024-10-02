"use client";
import { GithubFilled, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { ProConfigProvider, ProLayout } from "@ant-design/pro-components";
import { ConfigProvider, Dropdown } from "antd";
import React from "react";
import Image from "next/image";
import SearchInput from "@/layouts/basicLayout/components/SearchInput";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import "./index.css";
import {menus} from "../../../config/menu";
import {usePathname, useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const loginUser = useSelector((state: RootState) => state.loginUser);



  return (
    <div
      id="test-pro-layout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProConfigProvider hashed={false}>
        <ConfigProvider
          getTargetContainer={() => {
            return document.getElementById("test-pro-layout") || document.body;
          }}
        >
          <ProLayout
            layout={"top"}
            title={"面试刷题网站"}
            logo={
              <Image
                src="/assets/logo.png"
                width={40}
                height={40}
                alt={"面试刷题网站"}
              ></Image>
            }
            prefixCls="my-prefix"
            location={{
              pathname,
            }}
            siderMenuType="group"
            avatarProps={{
              title: loginUser.userName || "未登录",
              // src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
              src: loginUser.userAvatar || "/assets/logo.png",
              // size: "small",
              render: (props, dom) => {
                return (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: "userCenter",
                          icon: <UserOutlined />,
                          label: "个人中心",
                        },
                        {
                          key: "logout",
                          icon: <LogoutOutlined />,
                          label: "退出登录",
                        },
                      ],
                      onClick: async (event: { key: React.Key }) => {
                        const { key } = event;
                        if (key === "logout") {
                          // userLogout();
                        } else if (key === "userCenter") {
                          router.push("/user/center");
                        }
                      },
                    }}
                  >
                    {dom}
                  </Dropdown>
                );
              },
            }}
            actionsRender={(props) => {
              if (props.isMobile) return [];
              return [
                <SearchInput key="search" />,
                <a
                  key="github"
                  href="https://github.com/leweishang0/mianshi-next-frontend"
                  target="_blank"
                >
                  <GithubFilled key="GithubFilled" />
                </a>,
              ];
            }}
            headerTitleRender={(logo, title, _) => {
              return (
                <a>
                  {logo}
                  {title}
                </a>
              );
            }}
            onMenuHeaderClick={(e) => console.log(e)}
            // 定义有哪些菜单
            menuDataRender={() => {
              return menus
            }}
            // 定义了菜单项如何渲染
            menuItemRender={(item, dom) => (
              <Link href={item.path || "/"} target={item.target}>
                {dom}
              </Link>
            )}
              // 渲染底部栏
            footerRender={() => {
              return <GlobalFooter />;
            }}
          >
            {children}
          </ProLayout>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
}
