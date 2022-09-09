import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Tabs,
  Tab,
  AppBar,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import { Add, CheckCircle, Close, DoneRounded, Edit } from "@material-ui/icons";
import { Form, Formik } from "formik";
import React from "react";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import * as Yup from "yup";
import { useStyles } from "../Styles";
import { useQueryClient } from "react-query";
import { getData, postData } from "../../../utils/axiosQueries";

const Main = () => {
  const [search, setSearch] = useState<any>("");
  const [edit, setEdit] = useState<any>({});
  const [open, setOpen] = useState<any>(false);
  const [tab, setTab] = useState<any>(0);
  const [add, setAdd] = useState<any>(true);
  const classes = useStyles();
  const URL = process.env.API_URL;

  // Tab switcher state
  const handleTabs = (e: any, value: any) => {
    setTab(value);
  };

  // Tabs
  const TabPanel = (props: any) => {
    const { children, value, index } = props;

    return <div>{value === index && <>{children}</>}</div>;
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const queryClient = useQueryClient();

  // Getting the todo list
  const { data: todoList } = useQuery(
    ["todo"],
    () => getData({ url: `${URL}/get-todo-list` }),
    {
      onSuccess: (data) => {
        console.log(data?.data);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  // Getting the completed list
  const { data: completedList } = useQuery(
    ["completed"],
    () => getData({ url: `${URL}/get-completed-list` }),
    {
      onSuccess: (data) => {
        console.log(data?.data);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const TODO_LIST = todoList?.data?.payload;
  const COMPLETED_LIST = completedList?.data?.payload;

  // Get the number of items in Todo List
  const numberOngoing: any = TODO_LIST?.length || 0;

  // Get the number of items in Completed List
  const numberCompleted: any = COMPLETED_LIST?.length || 0;

  // Update todo
  const update_mutation = useMutation(
    (updateToDo: any): any => {
      return postData({
        url: `${URL}/update-todo/${edit?.id}`,
        body: updateToDo,
      });
    },
    {
      onSuccess: (data: any) => {
        console.log(data?.data);
        setEdit({});
        handleClose();
        queryClient.invalidateQueries("todo");
      },
      onError: (error: any) => {
        console.log(`Error: ${error}`);
      },
    }
  );

  // Put done todo in completed List
  const done_todo_mutation = useMutation(
    (doneToDo: any): any => {
      return postData({
        url: `${URL}/done-todo/${doneToDo?.id}`,
        body: doneToDo,
      });
    },
    {
      onSuccess: (data: any) => {
        console.log(data?.data);
        queryClient.invalidateQueries("todo");
        queryClient.invalidateQueries("completed");
      },
      onError: (error: any) => {
        console.log(`Error: ${error}`);
      },
    }
  );

  // Post new todo
  const post_todo_mutation = useMutation(
    (newToDo) => {
      return postData({ url: `${URL}/add-todo`, body: newToDo });
    },
    {
      onSuccess: (data: any) => {
        console.log(data?.data);
        queryClient.invalidateQueries("todo");
      },
      onError: (error: any) => {
        console.log(`Error: ${error}`);
      },
    }
  );

  // Delete all completed task
  const delete_completed_mutation = useMutation(
    () => {
      return postData({ url: `${URL}/delete-all`, body: {} });
    },
    {
      onSuccess: (data: any) => {
        console.log(data?.data);
        queryClient.invalidateQueries("completed");
      },
      onError: (error: any) => {
        console.log(`Error: ${error}`);
      },
    }
  );

  // Open Edit Modal
  const openEditModal = (data: any) => {
    setEdit(data);
    handleOpen();
  };

  // Validation Schemas - Yup
  const validationSchema = Yup.object().shape({
    todo: Yup.string().required("Text field is empty - cannot add to list"),
  });

  const updateValidationSchema = Yup.object().shape({
    updatedTodo: Yup.string().required("Please enter a value"),
  });

  // onSubmit function - todo add
  const onFinish = (values: any, actions: any) => {
    post_todo_mutation.mutate(values);
    actions.resetForm();
  };

  // onSubmit function - update todo
  const updatedTodoValue = (values: any) => {
    update_mutation.mutate(values);
  };

  return (
    <>
      {/* Add Field */}
      {add ? (
        <Box>
          <Formik
            initialValues={{ todo: "" }}
            validationSchema={validationSchema}
            onSubmit={onFinish}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Box className={classes.container}>
                  <TextField
                    id="add_field"
                    label="Add a new item to your list"
                    variant="outlined"
                    name="todo"
                    className={classes.textField}
                    onChange={handleChange}
                    value={values.todo}
                    onBlur={handleBlur}
                    helperText={touched.todo && errors.todo}
                    error={Boolean(touched.todo && errors.todo)}
                  />
                  <Button
                    variant="contained"
                    className={classes.add_button}
                    color="primary"
                    type="submit"
                    style={{ marginLeft: "10px" }}
                  >
                    {isSubmitting ? (
                      <CircularProgress style={{ color: "white" }} />
                    ) : (
                      <Add />
                    )}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      ) : null}
      {/* Search Field */}
      <div className={classes.search}>
        <TextField
          id="outlined-basic"
          label={
            add ? `Search your ongoing list` : `Search your completed list`
          }
          variant="outlined"
          className={classes.searchTextField}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      {/* Tab Switcher */}
      <AppBar position="sticky" style={{ marginTop: "25px" }}>
        <Tabs value={tab} onChange={handleTabs} variant="fullWidth">
          <Tab
            label={`Ongoing Tasks - ${numberOngoing}`}
            onClick={() => setAdd(true)}
          />
          <Tab
            label={`Completed Tasks - ${numberCompleted}`}
            onClick={() => setAdd(false)}
          />
        </Tabs>
      </AppBar>
      {/* Ongoing Tasks */}
      <TabPanel value={tab} index={0}>
        <div className={classes.table}>
          <TableContainer>
            <Table>
              <TableHead className={classes.head}>
                <TableRow>
                  <TableCell>To do list</TableCell>
                  <TableCell align="center" className={classes.done}>
                    Done
                  </TableCell>
                  <TableCell align="center" className={classes.edit}>
                    Edit
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {TODO_LIST?.filter((row: any) => {
                  if (search === "") {
                    return row?.to_do;
                  } else if (
                    row?.to_do.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return row?.to_do;
                  }
                })?.map((row: any) => (
                  <TableRow key={row?.id}>
                    <TableCell>{row?.to_do}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => done_todo_mutation.mutate(row)}>
                        <DoneRounded />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => openEditModal(row)}>
                        <Edit />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </TabPanel>
      {/* Completed Tasks */}
      <TabPanel value={tab} index={1}>
        <div className={classes.table}>
          <TableContainer>
            <Table>
              <TableHead className={classes.head}>
                <TableRow>
                  <TableCell>Completed list</TableCell>
                  <TableCell align="center" className={classes.done}>
                    Completed
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {COMPLETED_LIST?.filter((row: any) => {
                  if (search === "") {
                    return row?.completed;
                  } else if (
                    row?.completed.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return row?.completed;
                  }
                })?.map((row: any) => (
                  <TableRow key={row?.id}>
                    <TableCell>{row?.completed}</TableCell>
                    <TableCell align="right" style={{ display: "flex" }}>
                      <Typography className={classes.completedGreen}>
                        Completed
                      </Typography>
                      <CheckCircle className={classes.completedGreen} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.clear_btn}>
            <Button
              className={classes.delete_btn}
              onClick={() => delete_completed_mutation.mutate()}
            >
              Clear Completed List
            </Button>
          </div>
        </div>
      </TabPanel>
      {/* Modal */}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Formik
            initialValues={{ updatedTodo: edit?.to_do }}
            validationSchema={updateValidationSchema}
            onSubmit={updatedTodoValue}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Box className={classes.modalContainer}>
                  <Box className={classes.modal_nav}>
                    <Typography variant="h5">Edit</Typography>
                    <IconButton onClick={handleClose}>
                      <Close />
                    </IconButton>
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <TextField
                      size="small"
                      id="outlined-basic"
                      label="Edit"
                      name="updatedTodo"
                      value={values.updatedTodo}
                      variant="outlined"
                      className={classes.modalTextField}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.updatedTodo && errors.updatedTodo}
                      error={Boolean(touched.updatedTodo && errors.updatedTodo)}
                    />
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      margin: "10px 8px 10px 0",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      type="submit"
                    >
                      {isSubmitting ? (
                        <CircularProgress
                          size={"20px"}
                          style={{ color: "white" }}
                        />
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Main;
