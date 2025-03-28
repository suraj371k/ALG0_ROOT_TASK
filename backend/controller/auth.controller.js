import bcrypt from "bcryptjs";
import Auth from "../models/auth.model.js";
import jwt from 'jsonwebtoken'
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least six characters long" });
    }

    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Auth({ name, email, password: hashedPassword });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error in registerUser controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) { 
      return res.status(403).json({ message: "Unauthorize user" });
    }

    //generate jwt token
    const token = jwt.sign(
        {id: user._id , email: user.email} , 
        process.env.JWT_SECRET,
        {expiresIn: "2h"}
    )

    res.status(200).json({ message: "Login successful", token , user });
  } catch (error) {
    console.log("Error in loginUser controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { userId } = req.body; 

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await Auth.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Auth.findByIdAndDelete(userId);

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
