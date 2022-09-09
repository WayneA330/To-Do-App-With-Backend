import React from "react";
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import logo from "../assets/Search_engines.png";
import "../styles/customStyles.css";

const PublicLayout: React.FunctionComponent<any> = ({ children }) => {
  return (
    <>
      <Row>
        <Col
          xxl={6}
          xl={10}
          lg={12}
          md={14}
          sm={14}
          xs={24}
          className="beige-bc"
        >
          <div
            style={{
              flex: 1,
              padding: "100px 60px",
            }}
          >
            {children}
          </div>
        </Col>
        <Col
          xxl={18}
          xl={14}
          lg={12}
          md={10}
          sm={10}
          xs={0}
          className="paleGreen-bc"
        >
          <div
            style={{
              width: "-moz-available",
              height: "100vh",
            }}
          >
            <h1
              style={{
                textAlign: "right",
                padding: "5%",
                fontSize: "30px",
                color: "white",
              }}
            >
              The Digital Platform for managing ethics and regulatory matters in
              your organisation.
            </h1>
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
        </Col>
      </Row>
    </>
  );
};

export default PublicLayout;
