import React from "react";
import { useActions, useAppState } from "../overmind";
import {
  Button,
  Layout,
  Select,
  Drawer,
  // @ts-ignore
} from "wieldy/antd";
import { Link, useHistory } from "react-router-dom";
import { LogoutOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import logo from "../assets/check.png";
import dayjs from "dayjs";
import "../styles/header.css";
const { Header, Content, Sider, Footer } = Layout;

const PrivateLayout: React.FunctionComponent<any> = ({
  children,
  setSelectedClient,
  setSelectedClientId,
  isShell = false,
}) => {
  const history = useHistory();
  const user = useAppState();
  const actions = useActions();
  const [clients, setClients]: any[] = React.useState([]);
  const [navCollapse, setNavCollapse] = React.useState(false);

  //need to spred to get access
  const userSpread = { ...user };
  const getUserSpread = { ...userSpread.user };

  const logOut = () => {
    actions.logout();
    history.push("/");
  };

  React.useEffect(() => {
    if (getUserSpread && isShell) {
      let clientJSON = JSON.parse(getUserSpread?.client);
      setClients(clientJSON);
    }
  }, [user, isShell]);

  const clientSelect = (width: string) => (
    <Select
      showArrow
      showSearch
      style={{ width, borderRadius: "20px" }}
      filterOption={(input: any, option: any) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      filterSort={(optionA: any, optionB: any) =>
        optionA.children
          .toLowerCase()
          .localeCompare(optionB.children.toLowerCase())
      }
      placeholder={"Select a client"}
      onChange={(val: any, obj: any) => {
        setSelectedClient(obj?.other || []);
        setSelectedClientId(val);
      }}
    >
      {clients.map((obj: any) => (
        <Select.Option key={obj.id} value={obj.id} other={obj.services}>
          {obj.company}
        </Select.Option>
      ))}
    </Select>
  );

  const handleToggle = () => setNavCollapse(!navCollapse);

  return (
    <Layout className={"gx-app-layout"}>
      <Sider
        className={`gx-app-sidebar gx-collapsed-sidebar gx-layout-sider-dark`}
        trigger={null}
        collapsed={false}
        theme={"dark"}
        collapsible
      >
        <Drawer
          className={`gx-drawer-sidebar gx-drawer-sidebar-dark`}
          placement="left"
          closable={false}
          onClose={() => {
            setNavCollapse(!navCollapse);
          }}
          visible={navCollapse}
        >
          <div className="gx-layout-sider-header gx-justify-content-between light-bc">
            <div
              // onClick={() => history.push("/")}
              className="gx-text-white gx-fs-xl  gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo"
            >
              <img
                src={logo}
                alt="login image"
                style={{
                  width: "60%",
                }}
              />
            </div>
            <div
              style={{
                fontSize: 20,
              }}
            >
              {navCollapse === true ? (
                <CloseOutlined
                  onClick={() => {
                    handleToggle();
                  }}
                  className={"gx-icon-btn"}
                />
              ) : (
                <MenuOutlined
                  onClick={() => {
                    handleToggle();
                  }}
                  className={"gx-icon-btn"}
                />
              )}
            </div>
          </div>
          <div className="gx-sidebar-content">
            <div
              className={`gx-sidebar-notifications gx-no-header-notifications`}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className={"gx-mb-2"}>
                  {clientSelect && isShell && clientSelect("240px")}
                </div>
                <div>
                  <Button
                    type={"text"}
                    className={"gx-text-secondary gx-m-0"}
                    onClick={() => logOut()}
                  >
                    <span className="gx-d-flex gx-align-items-center">
                      <LogoutOutlined className="gx-mr-2" />
                      Sign Out
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      </Sider>

      <Layout>
        <div className="gx-header-horizontal gx-header-horizontal-dark gx-inside-header-horizontal">
          <Header className="header-bc">
            <div className="gx-container" style={{ width: "100%" }}>
              <div className="gx-header-horizontal-main-flex">
                <div className="gx-d-block gx-d-lg-none gx-linebar gx-mr-xs-3 6e">
                  <MenuOutlined
                    className="gx-icon-btn icon icon-menu"
                    onClick={() => {
                      setNavCollapse(!navCollapse);
                    }}
                  />
                </div>
                {logo && (
                  <>
                    <Link
                      to="/"
                      className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo"
                    >
                      <img alt="" src={logo} style={{ width: 100 }} />
                    </Link>

                    <Link
                      to="/"
                      className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo"
                    >
                      <img alt="" src={logo} style={{ width: 100 }} />
                    </Link>
                  </>
                )}
                <>
                  <div className="gx-text-white gx-fs-xl gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo">
                    <span
                      onClick={() => history.push("/")}
                      style={{ marginRight: "10px" }}
                    >
                      {/* <img
                        src={logo}
                        alt="login image"
                        style={{
                          width: "15%",
                        }}
                      /> */}
                    </span>
                    {clientSelect && isShell && clientSelect("350px")}
                  </div>
                </>

                <ul className="gx-header-notifications gx-ml-auto">
                  <li style={{ margin: 0 }}>
                    <h4 className={"gx-text-white gx-m-0"}>
                      {getUserSpread?.fullName || getUserSpread?.email}
                    </h4>
                  </li>

                  <li>
                    <Button
                      type={"text"}
                      className={"gx-text-secondary gx-m-0"}
                      onClick={() => logOut()}
                    >
                      <span className="gx-d-flex gx-align-items-center">
                        <LogoutOutlined className="gx-mr-2" />
                        Sign Out
                      </span>
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </Header>
        </div>
        <Content
          className={"gx-layout-content gx-container-wrap"}
          style={{ overflow: "auto !important" }}
        >
          <div
            className={"gx-main-content-wrapper"}
            style={{
              width: "100%",
              overflow: "auto",
              paddingBottom: "15px",
              paddingTop: "0px",
            }}
          >
            {/* {breadCrumConfig && (
              <BreadCrumNav breadCrumConfig={breadCrumConfig} />
            )} */}
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center", position: "relative" }}>
          {/* {footerLogo && (
            <div style={{ position: "absolute", top: 10, left: 10 }}>
              <img
                alt={"footer-logo"}
                src={footerLogo}
                style={{ width: "60px" }}
              />
            </div>
          )} */}
          Copyright © {dayjs().year()} Rogers Capital Ltd
        </Footer>
      </Layout>
    </Layout>
  );
};

export { PrivateLayout };
