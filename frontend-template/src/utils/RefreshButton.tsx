import React from "react";
import {
  Tooltip,
  // @ts-ignore
} from "wieldy/antd";

const RefreshButton = ({
  onClick,
  title,
  toolsAfterTitle,
  tooltipTitle,
}: any) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <div className={"gx-mr-2 gx-mt-2 gx-ml-0 gx-mb-0 gx-p-0"}>
        <Tooltip title={tooltipTitle}>
          <i
            className={"icon icon-frequent gx-text-primary onHoverClickable"}
            style={{ fontSize: 23, margin: 0, padding: 0 }}
            onClick={onClick}
          ></i>
        </Tooltip>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {title && <div>{title}</div>}
        {{ toolsAfterTitle } && (
          <div className={"gx-ml-2"}>{toolsAfterTitle}</div>
        )}
      </div>
    </div>
  );
};

export default RefreshButton;
