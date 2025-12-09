import { JWT_SECRET } from "../config/config.js";
import p_validator from "password-validator";
import JsonWebToken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import e_validator from "email-validator";
import Auth from "../models/auth.schema.js";
import emailTemplate from "../helper/emailtemplate.js"
import { AWSSES } from "../config/aws-ses.js";
import generateToken from "../helper/generateToken.js";
import { errorToast } from "../../pnyclient/src/hepler/toastify.js";
// PASSWORD VALIDATION RULES
const validpassword = new p_validator();
validpassword
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .symbols()
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(1)
  .has()
  .not()
  .spaces();

// ============================
//        PRE SIGNUP
// ============================
export const presignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.json({ 
        error: "All fields are required" 
      });
    }

    if (!e_validator.validate(email)) {
      return res.json({
        error: "Invalid email format",
      });
    }

    if (!validpassword.validate(password)) {
      return res.status(400).json({
        error:"Password must include uppercase, lowercase, number, symbol & minimum 8 chars",
      });
    }

    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.json({
        ok: false,
        error: "User already exists",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    // Here, you would typically send a verification email.
    // For simplicity, we'll skip that step.

    const token = JsonWebToken.sign(
      { username, email, password: hashedPass },
      JWT_SECRET,
      { expiresIn: "30m" }
    );
    // Send verification email (pseudo-function)
    // AWSSES.sendEmail(
    //   emailTemplate(
    //   email,
    //   "Verify your email",
    //  `<a href=http://localhost:5173/auth/${token}> Click here to activate account</a>`
    // )
    // )
 AWSSES.sendEmail(
   emailTemplate(
     email,
     "verification link",
     `<a href=http://localhost:5173/auth/${token}> Click here to activate account</a>`
   ),
   (err, data) => {
     if (data) {
       return res.json({
         message:
           "We have sent your verification link, please check your email address to complete the signup process",
       });
     } else if (err) {
       return res.json({
         error: err.message,
       });
     }
   }
 );
    
}catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// ============================
//        FINAL SIGNUP
// ============================
export const signup = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token)
      return res.json({  error: "Invalid token" });

    // Verify token
    const decoded = JsonWebToken.verify(token, JWT_SECRET);

    const { username, email, password } = decoded;

    // Check if user already exists
    const existingUser = await Auth.findOne({ email });
    if (existingUser)
      return res.json({ error: "User already activated" });

    // Create new user
    await Auth.create({
      username,
      email,
      password
    });

    return res.json({
      ok: true,
      newUser,
      message: "Account activated! Please login now.",
    });
  } catch (err) {
    return res.json({
      ok: false,
      error: err.message,
    });
  }
};

// ============================
//             LOGIN
// ============================



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ error: "Please enter both email and password" });
    }

    const email_check = e_validator.validate(email);
    if (!email_check) {
      return res.json({ error: "Please enter a valid email" });
    }

    // 1. Find user in DB
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found!" });
    }

    // 2. Compare password
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.json({ error: "Invalid password" });
    }
    console.log("Generating token for user:");
    console.log(generateToken(req, res, user));

    return generateToken(req, res, user);
  } catch (err) {
    console.error(err);
    return res.json(errorToast(err));
  }
};


// ============================
//       forget PASSWORD
// ============================

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.json({ error: "Email is required" });
    if (!e_validator.validate(email))
      return res.json({ error: "Invalid email format" });

    const user = await Auth.findOne({ email });
    if (!user) return res.json({ error: "User not found" });

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otp_expiry = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();

    // SEND EMAIL
    AWSSES.sendEmail(
      emailTemplate(
        email,
        "Your Password Reset OTP",
        `<h2>Your OTP Code:</h2>
         <h1>${otp}</h1>
         <p>This OTP will expire in 5 minutes</p>`
      ),
      (err, data) => {
        if (data)
          return res.json({
            message: "OTP sent to your email. Please check your inbox.",
          });

        return res.json({ error: err.message });
      }
    );
  } catch (err) {
    return res.json({ error: err.message });
  }
};


//veryfy otp

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) return res.json({ error: "Email & OTP are required" });

    const user = await Auth.findOne({ email });
    if (!user) return res.json({ error: "User not found" });

    if (user.otp !== otp) return res.json({ error: "Invalid OTP" });

    if (user.otp_expiry < Date.now()) return res.json({ error: "OTP expired" });

    // OTP valid → allow password reset
    return res.json({ success: true, message: "OTP verified successfully" });
  } catch (err) {
    return res.json({ error: err.message });
  }
};



// ============================
//       reset PASSWORD
// ============================

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword)
      return res.json({ error: "All fields are required" });

    const user = await Auth.findOne({ email });
    if (!user) return res.json({ error: "User not found" });

    if (user.otp !== otp) return res.json({ error: "Invalid OTP" });

    if (user.otp_expiry < Date.now()) return res.json({ error: "OTP expired" });

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;

    // clear otp fields
    user.otp = null;
    user.otp_expiry = null;

    await user.save();

    return res.json({ message: "Password reset successful" });
  } catch (err) {
    return res.json({ error: err.message });
  }
};


    



// ============================
//       GET ALL USERS (ADMIN)
// ============================
export const getAllUsers = async (req, res) => {
  try {
    // Only admin can access
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ error: "Access denied. Admin only." });
    }

    const users = await Auth.find().select("-password -otp -reset_password_code");

    return res.json({
      success: true,
      count: users.length,
      users,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ============================
//       UPDATE USER PROFILE
// ============================
export const updateUser = async (req, res) => {
  try {
    // user must be authenticated
    const requester = req.user;
    if (!requester) return res.status(401).json({ error: "Unauthorized" });

    const userId = requester._id;

    // Allowed fields to update
    const allowed = [
      "username",
      "mobile_number",
      "address",
      "profile_image",
      "age",
      "gender",
      "dob",
      "zipCode",
      "city",
      "province",
      "country",
      "email",
    ];

    const updates = {};
    Object.keys(req.body || {}).forEach((k) => {
      if (allowed.includes(k)) updates[k] = req.body[k];
    });

    // If email is being changed, ensure uniqueness
    if (updates.email) {
      const existing = await Auth.findOne({ email: updates.email, _id: { $ne: userId } });
      if (existing) return res.status(400).json({ error: "Email already in use" });
    }

    const updated = await Auth.findByIdAndUpdate(userId, updates, { new: true }).select("-password -otp -reset_password_code");

    return res.json({ success: true, user: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};





