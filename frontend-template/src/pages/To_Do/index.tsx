import React from "react";
import { Container, Typography, makeStyles } from "@material-ui/core";
import Main from "./components/Main";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  title: {
    color: blue[400],
    textAlign: "center",
    paddingTop: theme.spacing(7),
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Container>
      <Typography className={classes.title} variant="h4">
        To Do List
      </Typography>
      <Main />
    </Container>
  );
};

export default App;
