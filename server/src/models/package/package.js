import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String },
    banner: {
      secure_url: { type: String },
      public_id: { type: String },
      asset_id: { type: String },
    },
    image: {
      secure_url: { type: String },
      public_id: { type: String },
      asset_id: { type: String },
    },
    duration: {
      days: { type: Number },
      nights: { type: Number },
    },
    pickDropPoint: {
      pickup: { type: String },
      drop: { type: String },
    },
    itinerary: [
      {
        day: { type: Number, required: true },
        location: { type: String },
        title: { type: String },
        description: { type: String, required: true },
        hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hotel" }],
        activities: [
          { type: mongoose.Schema.Types.ObjectId, ref: "IndianActivity" },
        ],
      },
    ],
    startingPrice: {
      type: Number,
      required: true,
    },
    inclusions: [String],
    exclusions: [String],
    packageDestination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IndianDestinations",
    },
    // pricing: {
    //   innova: {
    //     capacity: { type: Number, default: 5 },
    //     price: Number,
    //   },
    //   tempo: {
    //     capacity: { type: Number, default: 10 },
    //     price: Number,
    //   },
    // },
    // premiumAddons: [
    //   {
    //     name: String,
    //     price: Number,
    //   },
    // ],
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);

export default Package;
