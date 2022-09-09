import * as React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

const Notification = (messages: string = "", type: any = "success") => {
  const state = { vertical: "top", horizontal: "right" };
  const { horizontal, vertical }: any = state;
  const [open, setOpen] = React.useState(true);
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ horizontal, vertical }}
      key={vertical + horizontal}
      //   autoHideDuration={10000}
      message={messages}
      onClose={handleClose}
    />
  );
};

export default Notification;
