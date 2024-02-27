import User from "../models/UserModel.js";
import argon2 from "argon2";
import { Op } from 'sequelize';

export const Login = async (req, res) =>{
    const user = await User.findOne({
        where: {
            Email: req.body.Email
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    const match = await argon2.verify(user.Password, req.body.Password);
    if(!match) return res.status(400).json({msg: "Wrong Password"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const Username = user.Username;
    const Email = user.Email;
    const role = user.role;
    res.status(200).json({uuid, Username, Email, role});
}

export const Register = async (req, res) => {
    const { Username, Email, Password, confPassword, NamaLengkap, Alamat } = req.body;

    const existingUser = await User.findOne({
        where: {
            [Op.or]: [
                { Email: Email }
            ]
        }
    });

    if (existingUser) {
        return res.status(400).json({ msg: "Email has already registered" });
    }

    if (Password !== confPassword) {
        return res.status(400).json({ msg: "Password and Confirm Password doesn't match" });
    }

    const hashPassword = await argon2.hash(Password);
    try {
        await User.create({
            Username: Username,
            Email: Email,
            Password: hashPassword,
            NamaLengkap: NamaLengkap,
            Alamat: Alamat
        });
        res.status(201).send("Success Register");
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).send("Error: Can't Logout");
        res.status(200).send("You have been Logout..");
    });
}