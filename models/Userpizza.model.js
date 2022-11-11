const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userPizzaSchema = new Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },

    namePizza: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
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
    ingredients: {
      type: [String],
      required: true,
    },

    review: {
      type: [String],
      required: false,
    },

    pizzaholic: [{
      type: Schema.Types.ObjectId,
      ref: "User",
      
    }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Userpizza = model("Userpizza", userPizzaSchema);

module.exports = Userpizza;
