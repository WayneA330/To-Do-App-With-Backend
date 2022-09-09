import * as React from "react";
// @ts-ignore
import { Form, Input, Button, Typography, notification } from "wieldy/antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { encrypt } from "../../utils/BodyEncryption";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Api from "../../api/api";
import "../../styles/SignIn.css";

const ResetPassword: React.FunctionComponent<any> = () => {
  const { Title } = Typography;
  const history = useHistory();

  const onFinish = async (values: any) => {
    try {
      const { email } = values;

      const response = await axios({
        url: Api.RESET_PW,
        method: "POST",
        data: {
          email: encrypt(email),
        },
      });

      if (response.status === 200) {
        return history.push({
          pathname: "/confirm-reset-password",
        });
      }
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

  return (
    <>
      <Title level={2} style={{ textAlign: "center" }}>
        Forgot password?
      </Title>
      <div className="spanColor" style={{ textAlign: "center" }}>
        No worries, we will send you the reset instructions.
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form
          name="reset-password"
          className="login-form"
          onFinish={onFinish}
          style={{ width: "100%", textAlign: "center" }}
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
            <Input placeholder="Enter your email address" />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ width: "100%" }}
              className="login-form-button loginButton"
              htmlType="submit"
            >
              Reset password
            </Button>
          </Form.Item>
          <Link to="/">
            <Button
              type="link"
              className="gx-mb-0 gx-mr-0"
              style={{ color: "#789899" }}
            >
              <ArrowLeftOutlined />
              <span>Back to login</span>
            </Button>
          </Link>
        </Form>
      </div>
    </>
  );
};

export { ResetPassword };
