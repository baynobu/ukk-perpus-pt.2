import User from "../models/UserModel.js";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "../utils/cloudinary.js";

export const Profile = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please LogIn first!" });
  }
  const user = await User.findOne({
    attributes: [
      "uuid",
      "Username",
      "Email",
      "NamaLengkap",
      "Alamat",
      "role",
    ],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.status(200).json(user);
};