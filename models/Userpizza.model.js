const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userPizzaSchema = new Schema(
  {
    nameUser: {
      type: String,
      trim: true,
      required: true,
    },
    namePizza: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    review: {
      type: [String],
      required: false,
    },
    city: {
      type: String,
      trim: true,
      required: true,
    },
    country: {
      type: String,
      trim: true,
      required: true,
    },
    pizzaholic: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Userpizza = model("Userpizza", userSchema);

module.exports = User;
