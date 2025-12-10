

import axios from "axios";
import UserModel from "../models/user.model.js";
import { oauth2client } from "../utils/googleConfig.js";

import generateAccessToken from "../utils/generateAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
export const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;

    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const { email, name } = userRes.data;

    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.create({ name, email });
    }

    const { _id } = user;

    const accessToken = await generateAccessToken(_id);
    const refreshToken = await generatedRefreshToken(_id);

    // ⭐⭐⭐ SAME COOKIE SET KAR DIYA (NORMAL LOGIN JESSA)
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accessToken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.json({
      message: "Google login successful",
      accessToken,
      refreshToken,
      user,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
