import { Newsletter } from "../schema/newsletter.schema.js";

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email is empty
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // Check if already subscribed
    const exist = await Newsletter.findOne({ email });

    if (exist) {
      return res.status(400).json({
        message: "You are already subscribed",
      });
    }

    // Save email
    await Newsletter.create({ email });

    return res.status(201).json({
      message: "Subscribed successfully!",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};