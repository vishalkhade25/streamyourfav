import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Please enter all details" })
        }
        const existingUsername = await UserModel.findOne({ username });
        const existingEmail = await UserModel.findOne({ email });
        if (existingUsername) {
            return res.status(400).json({ success: false, message: "Username already exists!" });
        }
        if (existingEmail) {
            return res.status(400).json({ success: false, message: "User with this email already exists!" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new UserModel({
            username,
            email,
            password: hashedPassword,
            role
        })
        await user.save();
        const token = jwt.sign({
            userId: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(201).json({ success: true, message: "User Registered Successfully", token })
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Server Error", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter all details" });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }
        const token = jwt.sign({
            userId: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({ success: true, message: "Login Successful", token });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message })
    }
};

export { loginUser, registerUser }