import express from "express";
import {
  createDestination,
  deleteDestination,
  getDestination,
  getPopularDestinations,
  getSingleDestination,
  searchDestinations,
  toggleDestinationPopularity,
  updateDestination,
} from "../../controllers/destination/destinationController.js";
import { getVehiclesForDestination } from "../../controllers/vehicle/vehicleController.js";
import { getHotelsByDestination } from "../../controllers/hotel/hotelController.js";
import { getActivitiesByDestination } from "../../controllers/activity/activityController.js";
import { getPackagesByDestination } from "../../controllers/package/packageController.js";
import fileParser from "../../middlewares/fileParser.js";

const router = express.Router();

router.route("/").post(fileParser, createDestination).get(getDestination);
router.route("/search").get(searchDestinations); // For separate searching of destinations when customizing
router.route("/popular").get(getPopularDestinations);
router
  .route("/:id")
  .get(getSingleDestination)
  .patch(fileParser, updateDestination)
  .delete(deleteDestination);

router.route("/:destinationId/hotels").get(getHotelsByDestination);
router.route("/:destinationId/vehicles").get(getVehiclesForDestination); //For selectin vehicle during customization|available vehicle will get
router.route("/:destinationId/activities").get(getActivitiesByDestination);
router.route("/:destinationId/packages").get(getPackagesByDestination); // Explore leh in home page UI
router
  .route("/:destinationId/toggle-popularity")
  .patch(toggleDestinationPopularity);

export default router;
