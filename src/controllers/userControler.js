import res from 'express/lib/response';
import db from '../models/index';
import userService from '../services/userService'

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password){
        return res.status(200).json({
            errCode: 1,
            message: 'Missing inputs parameter !'
        })
    }else{
        let userData = await userService.handleUserLogin(email, password);
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {}
    })
    }
    
}
 let handleGetAllUser = async (req, res) => {
     let id = req.query.id; // All(lay tat ca) , id(lay 1 nguoi dung)
     if(!id){
        return res.status(200).json({ 
            errCode:1,
            errMessage:'Missing required parameter !',
            user:[]
        })
     }
     let user = await userService.getAllUser(id);
     console.log(user);
     return res.status(200).json({ 
         errCode:0,
         user})
 }  

let handleCreateNewUser = async(req, res) => {
    let message = await userService.CreateNewUser(req.body)
    return res.status(200).json(message);
}
let handleDeleteUser = async(req, res) => {
    if(!req.body.id) {
        return res.status(200).json({
            errCode:1,
            errMessage:"missing required parameeters!"
        })
    }
    let message = await userService.deleteUser(req.body.id)
    return res.status(200).json(message);
}
let handleEditUser = async(req, res) => {
    let data = req.body;
    let allUsers = await userService.updateUserData(data);
    return res.status(200).json(allUsers);
}

let getAllCode = async(req, res) => {
    try {
        
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    }catch (e) {
        console.log('get all code errCode',e)
        return res.status(200).json({
            errCode:-1,
            errMessage:"Error from server"
        })
    }
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser:handleGetAllUser,
    handleCreateNewUser:handleCreateNewUser,
    handleEditUser:handleEditUser,
    handleDeleteUser:handleDeleteUser,
    getAllCode:getAllCode
}