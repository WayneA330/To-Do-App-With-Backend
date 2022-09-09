import * as React from "react";
import { useState, useEffect } from "react";
// @ts-ignore
import { Form, Input, Button, Typography, notification } from "wieldy/antd";
import { LockOutlined } from "@ant-design/icons";
import { encrypt } from "../../utils/BodyEncryption";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import Api from "../../api/api";
import * as queryString from "querystring";
const { Title } = Typography;

const FirstTime: React.FunctionComponent<any> = (props: any) => {
  const history = useHistory();
  const [hash, setHash] = useState<any>(null);
  const location = useLocation();
  const { reset } = props;

  const onFinish = async (values: any) => {
    try {
      const { password, confirm_password } = values;

      if (password !== confirm_password) {
        notification["error"]({
          message: "Your password does not match!",
        });
        return;
      }

      const response = await axios({
        url: Api.FIRST_LOGIN,
        method: "POST",
        data: {
          password: encrypt(password),
          hash: reset ? null : hash,
          password_reset_hash: reset ? hash : null,
        },
      });

      if (response.status === 200) {
        return history.push({
          pathname: "/otp",
          state: {
            otp: response?.data?.payload?.otp,
            email: response?.data?.payload?.email,
          },
        });
      }
      // .then((response) => {
      //   console.log({ response });
      //   if (response.status === 200) {
      //     return history.push({
      //       pathname: "/otp",
      //       state: {
      //         otp: response?.data?.payload?.otp,
      //         email: response?.data?.payload?.email,
      //       },
      //     });
      //   }
      // })
      // .catch((res) => {
      //   console.log(JSON.stringify(res));
      // });
    } catch (error) {
      console.log({ error });
      if (error?.response?.status === 400 || error.response?.status === 403) {
        notification["error"]({
          message: error?.response?.data?.error,
        });
      } else {
        notification["error"]({
          message: "An error occurred. Please try again!",
        });
      }
    }
  };

  useEffect(() => {
    const confirmHash = location?.search !== "" ? location?.search : null;
    const parsedHash = confirmHash
      ? queryString.parse(confirmHash)["?hash"]
      : null;
    if (parsedHash) setHash(parsedHash);
  }, [location]);

  return (
    <>
      <Title level={2} style={{ textAlign: "center" }}>
        Welcome to Check
      </Title>
      <div
        className="spanColor"
        style={{ textAlign: "center", padding: "20px" }}
      >
        Enter your new password
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form
          name="first-login"
          className="login-form"
          onFinish={onFinish}
          style={{ width: "100%" }}
        >
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirm_password"
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
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item style={{ padding: "20px 0" }}>
            <Button
              style={{ width: "100%" }}
              className="login-form-button loginButton"
              htmlType="submit"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export { FirstTime };
