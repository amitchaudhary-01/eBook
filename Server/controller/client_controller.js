import { Client } from "../schema/client_schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Create = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "Data Missing" });
    }

    const exist = await Client.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email Already Exist" });
    }

    const hash = await bcrypt.hash(password, 10);

    const data = await Client.create({
      fullname,
      email,
      password: hash,
    });

    // 📡 REAL-TIME SOCKET EMIT: CREATE
    const io = req.app.get("io");
    if (io) {
      io.emit("new_client_registered", {
        _id: data._id,
        fullname: data.fullname,
        email: data.email,
        createdAt: data.createdAt,
      });
    }

    return res.status(200).json({
      message: "Client Created Successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export default Create;

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password required" });
    }

    const clientExist = await Client.findOne({ email });
    if (!clientExist) {
      return res.status(400).json({ message: "Email doesn't Exist" });
    }

    const checkPassword = await bcrypt.compare(password, clientExist.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const userRole = clientExist.role || "user";

    const token = jwt.sign(
      { id: clientExist._id, role: userRole },
      process.env.JWT_SECRET_KEY || "book-secret-key",
      { expiresIn: "1h" }
    );

    res.cookie("client", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // 📡 REAL-TIME SOCKET EMIT: SIGN IN
    const io = req.app.get("io");
    if (io) {
      io.emit("client_logged_in", {
        _id: clientExist._id,
        fullname: clientExist.fullname,
        email: clientExist.email,
        role: userRole,
      });
    }

    const successMessage =
      userRole === "admin"
        ? "Admin Logged In Successfully"
        : "Client Logged In Successfully";

    return res.status(200).json({
      message: successMessage,
      token,
      user: {
        id: clientExist._id,
        fullname: clientExist.fullname,
        email: clientExist.email,
        role: userRole,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("client", { httpOnly: true });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const me = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user: req.user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const GetClient = async (req, res) => {
  try {
    const data = await Client.find();
    return res.status(200).json({
      success: true,
      message: "Get Client Data",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    // 📡 REAL-TIME SOCKET EMIT: DELETE
    const io = req.app.get("io");
    if (io) {
      io.emit("client_deleted", {
        _id: deletedClient._id,
        fullname: deletedClient.fullname,
        email: deletedClient.email,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Client deleted successfully",
      data: {
        _id: deletedClient._id,
        email: deletedClient.email,
      },
    });
  } catch (error) {
    console.error("Delete Client Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};