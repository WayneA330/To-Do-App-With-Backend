import * as React from "react";
import { useState, useEffect } from "react";
// @ts-ignore
import { Form, Input, Button, Typography, notification } from "wieldy/antd";
// // @ts-ignore
import { encrypt } from "../../utils/BodyEncryption";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import Api from "../../api/api";
// // @ts-ignore
import { useActions } from "../../overmind";
import "../../styles/SignIn.css";

const Otp: React.FunctionComponent<any> = () => {
  const { Title } = Typography;
  const history = useHistory();
  const [hashOtp, setHashOtp] = useState("");
  const [email, setEmail] = useState("");

  const location = useLocation();
  const { logIn } = useActions();

  const onFinish = async (values: any) => {
    await axios({
      url: Api.VerifyOtp,
      method: "POST",
      data: {
        otp: encrypt(values.otp),
        hashOtp: hashOtp,
        email: email,
      },
    })
      .then((response) => {
        logIn({ ...response?.data?.payload });
        history.push("/");
      })
      .catch((responseError) => {
        // console.log({ responseError });

        if (responseError?.response?.data?.payload === "expired") {
          notification["error"]({
            message: "Expired OTP",
            description: "Your OTP is expired, please sign in again.",
          });
          history.push("/");
          return;
        } else {
          notification["error"]({
            message: "Invalid OTP",
            description:
              "Please input the code we have sent you on your email address.",
          });
          return;
        }
      });
  };

  useEffect(() => {
    const hash: any = location.state || "";
    hash && setHashOtp(hash?.otp);
    hash && setEmail(hash?.email);

    !hash && history.push("/");
  }, [location]);

  return (
    <>
      <Title level={2} style={{ textAlign: "center" }}>
        OTP
      </Title>
      <p style={{ textAlign: "center", marginBottom: "50px" }}>
        We have sent you a code on your email address
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
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
            name="otp"
            rules={[
              {
                required: true,
                message: "Please input your OTP!",
              },
            ]}
          >
            <Input placeholder="Enter OTP" />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ width: "100%" }}
              className="login-form-button loginButton"
              htmlType="submit"
            >
              Verify
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export { Otp };
