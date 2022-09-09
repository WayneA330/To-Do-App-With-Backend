const { knexDb } = require("../../../utils/routes.imports.utils");

const delete_all = async (req, res) => {
  try {
    await knexDb.raw(`DELETE FROM [TODO_LIST].[dbo].[Completed_List]`);

    res.status(200).send({
      message: "Completed list deleted!",
    });
  } catch (err) {
    console.log({ err });
    res.status(404).send({
      message: "Error occured when delete the completed list!",
    });
  }
};

module.exports = delete_all;
