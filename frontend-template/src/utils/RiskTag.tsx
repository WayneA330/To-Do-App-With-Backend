import React from "react";
// @ts-ignore
import { Tag, Tooltip } from "wieldy/antd";

const RiskTag = ({ name = "", label, tooltip }: any) => {
  let color = "#339900";

  switch (name.trim().toUpperCase()) {
    case "HIGH":
      color = "#cc3300";
      break;
    case "MEDIUM HIGH":
      color = "#ff9966";
      break;
    case "MEDIUM LOW":
      color = "#99cc33";
      break;
    case "MEDIUM":
      color = "#ffcc00";
      break;
    default:
      break;
  }
  return tooltip ? (
    <Tooltip title={tooltip}>
      <Tag
        color={color}
        style={{ fontSize: "1.1em", margin: 0, textTransform: "capitalize" }}
      >
        {label?.toLowerCase()}
      </Tag>
    </Tooltip>
  ) : (
    <Tag
      color={color}
      style={{ fontSize: "1.1em", margin: 0, textTransform: "capitalize" }}
    >
      {label?.toLowerCase()}
    </Tag>
  );
};

export default RiskTag;
