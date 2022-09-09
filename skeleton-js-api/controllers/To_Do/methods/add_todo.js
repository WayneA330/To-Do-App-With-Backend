const { knexDb } = require("../../../utils/routes.imports.utils");

const add_todo = async (req, res) => {
  try {
    await knexDb(`[TODO_LIST].[dbo].[To_Do]`).insert({
      to_do: req?.body?.todo,
    });

    res.status(200).send({
      message: "Todo added successfully!",
      payload: req?.body,
    });
  } catch (err) {
    console.log({ err });
    res.status(404).send({
      message: "Error occured when adding todo!",
    });
  }
};

module.exports = add_todo;
