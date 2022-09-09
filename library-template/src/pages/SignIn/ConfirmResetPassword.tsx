import * as React from "react";
import { Form, Input, Button, Typography } from "antd";
import { Link, useHistory } from "react-router-dom";

const ConfirmResetPassword: React.FunctionComponent<any> = () => {
  const { Title } = Typography;
  const history = useHistory();
  return (
    <>
      <Title level={2} style={{ textAlign: "center" }}>
        Check your email
      </Title>
      <p className="spanColor" style={{ textAlign: "center" }}>
        We have sent you a password reset link to your email address
      </p>
      <Link to="/">
        <Button className="gx-mb-0 gx-mr-0 loginButton">
          <span>Back to login</span>
        </Button>
      </Link>
    </>
  );
};

export { ConfirmResetPassword };
