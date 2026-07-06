import { Client } from "../schema/client_schema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Create = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: "Data Missing"
            });
        }

        const exist = await Client.findOne({ email });

        if (exist) {
            return res.status(400).json({
                message: "Email Already Exist"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const data = await Client.create({
            fullname,
            email,
            password: hash
        });

        return res.status(200).json({
            message: "Client Created Successfully",
            data
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

export default Create;

/////signIn///

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and Password required"
            });
        }

        const clientExist = await Client.findOne({ email });

        if (!clientExist) {
            return res.status(400).json({
                message: "Email doesn't Exist"
            });
        }

        const checkPassword = await bcrypt.compare(password, clientExist.password);

        if (!checkPassword) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: clientExist._id },
            process.env.JWT_SECRET_KEY || 'book-secret-key',
            { expiresIn: '1h' }
        );

        res.cookie('client', token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            message: "Client LoggedIn Successfully",
            data: token
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
};
