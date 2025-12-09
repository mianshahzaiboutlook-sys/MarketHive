// import React from 'react'

import { JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";

const generateToken = (req, res, user) => {
  try {
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "30d",
    });
    user.password = undefined;
    //  reset_password_code = undefined;
    return res.json({
      user,
      token,
      refreshToken,
    });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

export default generateToken;
