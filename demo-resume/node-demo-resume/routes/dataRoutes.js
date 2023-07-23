const {
    getAllData,
    getData,
    createData,
    updateData,
    deleteData,
    deleteAllData } = require("../controllers/dataController");

const router = require("express").Router();
router.route("/").get(getAllData).post(createData).delete(deleteAllData);

router.route("/:id").get(getData).patch(updateData).delete(deleteData);

module.exports = router;
