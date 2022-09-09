const { knexDb } = require("../../../utils/routes.imports.utils");

const done_todo = async (req, res) => {
  try {
    await knexDb.raw(
      `DELETE FROM [TODO_LIST].[dbo].[To_Do] WHERE id = '${req?.params?.id}'`
    );

    await knexDb(`[TODO_LIST].[dbo].[Completed_List]`).insert({
      id: req?.params?.id,
      completed: req?.body?.to_do,
    });

    res.status(200).send({
      message: "Todo moved to completed list!",
      payload: req?.body,
    });
  } catch (err) {
    console.log({ err });
    res.status(404).send({
      message: "Error occured moving todo to completed list!",
    });
  }
};

module.exports = done_todo;
