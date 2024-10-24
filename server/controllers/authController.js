import userModel from "../models/userModel.js" ;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signUp = async (req, res) => {
    console.log('Signup request received');
  
    try {
      const { username, email, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new userModel({ username, email, password: hashedPassword, role });
      await newUser.save();
      console.log('User saved successfully:', newUser);
  
    //   const token = jwt.sign({ userId: newUser._id, role }, process.env.SECRET_KEY, {
    //     expiresIn: '1h',
    //   });
  
      return res.status(200).json({ message: `User registered with username ${username}` });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  };

export const login=async(req,res)=>{
    try{
    const{username,email,password}=req.body;
    const user = await userModel.findOne({username});

    if(!user){
      return res.status(404).json({message:`User not found`});
    }
    const isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(404).json({message:`Password wrong`});
    }
    const token = jwt.sign({id:user._id, username: user.username,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"}); 
    console.log("Token:", token);  
    console.log("Decoded Token:", jwt.decode(token));

    res.status(200).json({token,role: user.role});

    }
    catch(err){
        res.status(500).json({message:`Serverr error`});
    }
};


export default {
   
};
