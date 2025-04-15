import mongoose from 'mongoose'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

adminSchema.methods.generateAccessToken = function (){
    const accessToken = jwt.sign({id: this.id, email:this.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY});
    console.log("Access token generated successfully.")
    return accessToken;
}
adminSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}


const Admin =new mongoose.model('Admin', adminSchema)
export default Admin;