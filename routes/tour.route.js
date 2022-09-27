const express = require("express");
const {
  getAllTour,
  createTour,
  insertMultiple,
  getSingleTour,
  updateTour,
  getCheapestTours,
  getTrendingTours,
} = require("../controllers/tour.controller");
const router = express.Router();
router.route("/").get(getAllTour).post(createTour);
router.route("/insertmany").post(insertMultiple);
router.route("/cheapest").get(getCheapestTours);
router.route("/trending").get(getTrendingTours);
router.route("/:id").get(getSingleTour).patch(updateTour);
module.exports = router;
