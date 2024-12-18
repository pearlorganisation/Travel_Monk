import express from "express";
import {
  deleteContactById,
  getAllContacts,
  submitContactForm,
} from "../../controllers/contact/contactController.js";
import {
  createBusCruiseContact,
  getAllBusCruiseContacts,
  getBusCruiseContactById,
  updateBusCruiseContact,
  deleteBusCruiseContact,
} from "../../controllers/busCruiseContact/busCruiseContactController.js";
import { createHotelContact } from "../../controllers/hotelContact/hotelContactController.js";

const router = express.Router();

router.route("/").post(submitContactForm).get(getAllContacts);
router.route("/:id").delete(deleteContactById);
router
  .route("/bus-cruise")
  .post(createBusCruiseContact)
  .get(getAllBusCruiseContacts);
router
  .route("/bus-cruise/:id")
  .get(getBusCruiseContactById)
  .put(updateBusCruiseContact)
  .delete(deleteBusCruiseContact);

router.route("/hotel").post(createHotelContact);

export default router;
