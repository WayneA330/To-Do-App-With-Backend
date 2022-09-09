import React from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { CircularProgress, Box } from "@material-ui/core";
/** @jsx jsx */
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#88abad",
    alignItems: "center",
  },
  circularProgress: {
    color: "white",
    animation:
      "MuiCircularProgress-keyframes-circular-rotate 1.4s linear infinite, changeColor 2s linear infinite",
  },
}));

export const LoadingPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.root}>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CircularProgress
          color="primary"
          thickness={5}
          size={isMobile ? 75 : 100}
          disableShrink
          className={classes.circularProgress}
        />
        <h1 style={{ color: "white" }}>Loading</h1>
      </Box>
    </div>
  );
};
