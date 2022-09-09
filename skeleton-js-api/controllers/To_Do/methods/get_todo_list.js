const { knexDb } = require("../../../utils/routes.imports.utils");

const get_all_todo = async (req, res) => {
  try {
    const todo_list = await knexDb.raw(
      `SELECT * FROM [TODO_LIST].[dbo].[To_Do]`
    );

    res.status(200).send({
      message: "Got the todo list!",
      payload: todo_list,
    });
  } catch (err) {
    console.log({ err });
    res.status(404).send({
      message: "Error occured when getting the todo list!",
    });
  }
};

module.exports = get_all_todo;
