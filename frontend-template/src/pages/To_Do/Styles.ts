import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    display: "flex",
    justifyContent: "space-between",
  },
  search: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  textField: {
    width: "93%",
  },
  searchTextField: {
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
  },
  modalTextField: {
    width: "95%",
  },
  add_button: {
    height: "55px",
    width: "70px",
  },
  table: {
    marginTop: "30px",
  },
  head: {
    width: "100%",
  },
  done: {
    width: "20px",
  },
  edit: {
    width: "20px",
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    width: "350px",
    height: "fit-content",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 10,
  },
  modal_nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "10px",
    marginTop: "5px",
  },
  completedGreen: {
    color: "green",
    marginRight: "5px",
  },
  clear_btn: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  },
  delete_btn: {
    backgroundColor: red[600],
    "&:hover": {
      background: red[500],
    },
  },
}));
