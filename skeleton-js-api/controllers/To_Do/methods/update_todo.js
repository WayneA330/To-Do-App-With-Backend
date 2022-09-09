const { knexDb } = require("../../../utils/routes.imports.utils");

const update_todo = async (req, res) => {
  try {
    await knexDb.raw(
      `UPDATE [TODO_LIST].[dbo].[To_Do] SET to_do = '${req?.body?.updatedTodo}' WHERE id = '${req?.params?.id}'`
    );
    res.status(200).send({
      message: "Todo updated successfully!",
      payload: req?.body,
    });
  } catch (err) {
    res.status(404).send({
      message: "Error occured when updating todo!",
    });
  }
};

module.exports = update_todo;
