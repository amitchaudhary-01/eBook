import {Client} from '../schema/client_schema.js'; 

export const getUserProfile = async (req, res) => {
  try {
    // req.userId is passed from isAuthenticated middleware
    const user = await Client.findById(req.userId).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};