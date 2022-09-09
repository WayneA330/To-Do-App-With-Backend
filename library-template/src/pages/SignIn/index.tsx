import React from "react";
// @ts-ignore
import { Form, Input, Button, notification } from "wieldy/antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { encrypt } from "../../utils/BodyEncryption";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Api from "../../api/api";
import "../../styles/SignIn.css";
import logo from "../../assets/check.png";

const SignIn = () => {
  const history = useHistory();

  const onFinish = async (values: any) => {
    const encryptValues = encrypt(
      JSON.stringify({
        ...values,
      })
    );

    await axios({
      url: Api.SignIn,
      method: "POST",
      data: { encryptedData: encryptValues },
    })
      .then((response) => {
        if (response.status === 200) {
          return history.push({
            pathname: "/otp",
            state: {
              otp: response?.data?.payload?.otp,
              email: response?.data?.payload?.email,
            },
          });
        }
      })
      .catch((res) => {
        console.log({ error: res });
        notification["error"]({
          message: "Your credentials are not valid",
        });
      });
  };
  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <img
          src={logo}
          alt="login image"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            position: "relative",
            top: "-5%",
            width: "60%",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          style={{ width: "100%" }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
              {
                type: "email",
                message: "Please input Valid Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button className="loginButton" htmlType="submit" size="large">
              Login
            </Button>
          </Form.Item>

          <Form.Item>
            <a
              className="login-form-forgot"
              onClick={() => history.push("/reset-password")}
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#789899",
              }}
            >
              Forgot password
            </a>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export { SignIn };
