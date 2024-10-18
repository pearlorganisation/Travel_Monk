// @desc Create a new Partner

import Partner from "../../models/partner/partner.js";
import { uploadFileToCloudinary } from "../../utils/cloudinary.js";
import ApiErrorResponse from "../../utils/errors/ApiErrorResponse.js";
import { asyncHandler } from "../../utils/errors/asyncHandler.js";

// @route POST /api/v1/partners
export const createPartner = asyncHandler(async (req, res, next) => {
  const { partnerLogo } = req.files;
  let uploadedLogo;

  if (partnerLogo) {
    uploadedLogo = await uploadFileToCloudinary(partnerLogo); // Assuming this function exists
  }

  const newPartner = await Partner.create({
    ...req.body,
    partnerLogo: uploadedLogo ? uploadedLogo[0] : req.body.partnerLogo, // Fallback if logo upload fails
  });

  if (!newPartner) {
    return next(new ApiErrorResponse("Partner is not created", 400));
  }

  return res.status(201).json({
    success: true,
    message: "Partner is created",
    data: newPartner,
  });
});

// @desc Get all Partners
// @route GET /api/v1/partners
export const getAllPartners = asyncHandler(async (req, res, next) => {
  const partners = await Partner.find().populate("partnerType"); // Populate partnerType for more info
  if (!partners) {
    return next(new ApiErrorResponse("No Partners found", 404));
  }
  return res.status(200).json({
    success: true,
    data: partners,
  });
});

// @desc Get a single Partner by ID
// @route GET /api/v1/partners/:id
export const getPartnerById = asyncHandler(async (req, res, next) => {
  const partner = await Partner.findById(req.params.id).populate("partnerType");
  if (!partner) {
    return next(new ApiErrorResponse("Partner not found", 404));
  }
  return res.status(200).json({
    success: true,
    data: partner,
  });
});

// @desc Update a Partner by ID
// @route PUT /api/v1/partners/:id
export const updatePartnerById = asyncHandler(async (req, res, next) => {
  const { partnerLogo } = req.files;
  let uploadedLogo;

  if (partnerLogo) {
    uploadedLogo = await uploadFileToCloudinary(partnerLogo); // Assuming this function exists
  }

  const updatedPartner = await Partner.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      partnerLogo: uploadedLogo ? uploadedLogo[0] : req.body.partnerLogo, // Fallback if logo upload fails
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedPartner) {
    return next(new ApiErrorResponse("Partner not found or not updated", 404));
  }
  return res.status(200).json({
    success: true,
    message: "Partner updated",
    data: updatedPartner,
  });
});

// @desc Delete a Partner by ID
// @route DELETE /api/v1/partners/:id
export const deletePartnerById = asyncHandler(async (req, res, next) => {
  const deletedPartner = await Partner.findByIdAndDelete(req.params.id);
  if (!deletedPartner) {
    return next(new ApiErrorResponse("Partner not found", 404));
  }
  return res.status(200).json({
    success: true,
    message: "Partner deleted",
  });
});
