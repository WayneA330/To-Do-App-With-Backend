const add_todo = require("./methods/add_todo");
const get_all_todo = require("./methods/get_todo_list");
const get_completed_list = require("./methods/get_completed_list");
const done_todo = require("./methods/done_todo");
const delete_all = require("./methods/delete_all");
const update_todo = require("./methods/update_todo");

const ToDoController = {
  add_todo,
  get_all_todo,
  get_completed_list,
  done_todo,
  delete_all,
  update_todo,
};

module.exports = ToDoController;
