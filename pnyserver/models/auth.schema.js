import {mongoose, Schema, model} from 'mongoose';
// User Schema
const authSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile_number: {
      type: String,
    },
    role: {
      type: ["buyer"], ///todo
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    profile_image: {},
    reset_password_code: {},
    otp: { default: "", type: String },
    otp_expiry: { type: Date },

    age: { type: String, default: "" },
    gender: { type: String, default: "" },
    dob: { type: String, default: "" },
    zipCode: { type: String, default: "" },
    city: { type: String, default: "" },
    province: { type: String, default: "" },
    country: { type: String, default: "" },
    address: { type: String, default: "" },
  },
  { timestamps: true }
);
 const Auth = model("user", authSchema);
 export default Auth;