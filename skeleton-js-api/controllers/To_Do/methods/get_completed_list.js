const { knexDb } = require("../../../utils/routes.imports.utils");

const get_completed_list = async (req, res) => {
  try {
    const completed_list = await knexDb.raw(
      `SELECT * FROM [TODO_LIST].[dbo].[Completed_List]`
    );

    res.status(200).send({
      message: "Got the todo list!",
      payload: completed_list,
    });
  } catch (err) {
    console.log({ err });
    res.status(404).send({
      message: "Error occured when getting the todo list!",
    });
  }
};

module.exports = get_completed_list;
