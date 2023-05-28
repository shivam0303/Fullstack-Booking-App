import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try{
        //generate new password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).send("user has been created");
    }   
    catch(err){
        next(err)
    }   
}

export const login = async (req, res, next) => {
    try{
        //find user
        const user = await User.findOne({username:req.body.username});
        if(!user) return res.status(400).send("user not found");

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect) 
            return res.status(400).send("Wrong password")

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.SECRET_KEY);
        
        const {password,isAdmin, ...others} = user._doc;    

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({others});
    }   
    catch(err){
        next(err)
    }   
}