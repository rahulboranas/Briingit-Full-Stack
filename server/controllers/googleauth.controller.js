// import axios from "axios";
// import jwt from "jsonwebtoken";
// import UserModel from "../models/user.model.js";
// import generateAccessToken from "../utils/generateAccessToken.js";
// import generatedRefreshToken from "../utils/generatedRefreshToken.js";

// export const googleAuthController = async (req, res) => {
//   try {
//     const { code } = req.query;
//     if (!code) {
//       return res.status(400).json({ success: false, message: "Missing code" });
//     }

//     // 1️⃣ Exchange authorization code for access token
//     const tokenResponse = await axios.post("https://oauth2.googleapis.com/token", {
//       code,
//       client_id: process.env.GOOGLE_CLIENT_ID,
//       client_secret: process.env.GOOGLE_CLIENT_SECRET,
//       redirect_uri: process.env.GOOGLE_REDIRECT_URI,
//       grant_type: "authorization_code",
//     });

//     const { access_token, id_token } = tokenResponse.data;

//     // 2️⃣ Decode user info from Google
//     const googleUser = jwt.decode(id_token);
//     if (!googleUser.email) {
//       return res.status(400).json({ success: false, message: "Invalid Google user" });
//     }

//     // 3️⃣ Check if user already exists or create new
//     let user = await UserModel.findOne({ email: googleUser.email });
//     if (!user) {
//       user = await UserModel.create({
//         name: googleUser.name,
//         email: googleUser.email,
//         avatar: googleUser.picture,
//         verify_email: true,
//       });
//     }

//     // 4️⃣ Generate tokens
//     const accessToken = await generateAccessToken(user._id);
//     const refreshToken = await generatedRefreshToken(user._id);

//     // 5️⃣ Set cookies
//     const cookieOptions = {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None",
//     };
//     res.cookie("accessToken", accessToken, cookieOptions);
//     res.cookie("refreshToken", refreshToken, cookieOptions);

//     // 6️⃣ Redirect user to frontend after successful login
//     return res.redirect(`${process.env.FRONTEND_URL}/login-success?token=${accessToken}`);
//   } catch (error) {
//     console.error("Google login error:", error);
//     res.status(500).json({ success: false, message: "Google auth failed", error: error.message });
//   }
// };
