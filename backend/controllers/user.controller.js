import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { fullname, email, password,phoneNumber,role } = req.body;
        // Validate input
        if (!fullname || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({
                 message: 'All fields are required',
                 success: false
                });
        };
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                 message: 'User already exists',
                 success: false,
                })
        }
        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            password: hashedPassword,
            phoneNumber,
            role,
        });
        return res.status(201).json({
            message: 'User registered successfully',
            success: true,
        });

    } catch (error) {
        console.log(error);
    
    }
}
export const login = async (req, res) => {
    try{
        const{ email, password } = req.body;
        if(!email || !password || !role) {
            return res.status(400).json({
                message: 'Something is missing',
                success: false,
            });
        };
        let  user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({
                message: 'Incorrect email or password',
                success: false,
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({
                message: 'Incorrect email or password',
                success: false,
            })
        };
        //check role is correct or not
        if(role!== user.role) {
            return res.status(400).json({
                message: 'Invalid role',
                success: false,
            })
        };
        const tokenData={
            userId:user._id

        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: '1d'});
        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
        }
        return res.status(200).cookie('token', token, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict'}).json({
            message :'Welcome back ${user.fullname}',
            user,
            success: true,
        })

    } catch(error){
        console.log(error);

    }

}