import { UserModel } from '../config/connectDb.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
dotenv.config();


export const registerUser = async (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
        console.error("Validation Errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
   
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    try {
        const existingUser = await UserModel.findOne({ where: {email: email.toLowerCase() } });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            name,
            email: email.toLowerCase(), 
            password: hashedPassword
        });

        const accessToken = jwt.sign(
            {
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email
                }
            },
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: '1h' } 
        );

        res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            accessToken
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ where: { email:email.toLowerCase() } });

        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const accessToken = jwt.sign(
                {
                    user: {
                        name: user.name,
                        email: user.email,
                        id: user.id
                    }
                },
                process.env.ACCESS_TOKEN_SECRET
            );
            return res.status(200).json({
                accessToken,
                userName: user.name,
                userEmail: user.email,
                userId: user.id
            });
        } else {
            return res.status(401).json({ message: "Incorrect email or password" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
  };

  