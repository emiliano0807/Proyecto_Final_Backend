/*Aqui iran los mensajes de crear, actualizar eliminar o obtener los datos */ 

const userModel = require('../models/users.model');

// Obtener todos los usuarios
const getUsers = async (req, res)=>{
    try{ 
        const user = await userModel.getUsers()
        res.json(user);
    }catch(error){
        console.log(error);
        res.status(500).json({err:error.message||"Error al obtener los usuarios"});
    }
    
}

// Obtener el usuario por ID
const getUsersById = async (req, res)=>{
    try{
        const id = req.params.id;

        const user =  await userModel.getUsersById(id)
        if(!user){
            return res.status(404).json({err:error.message||"Usuario no encontrado"});
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({err:error.message||"Error al obtener el usuario"});
    }
}

// Crear un nuevo usuario
const createUser = async (req, res)=>{
    try{
        const data = req.body;
        const newUser = await userModel.createUser(data);
        res.status(201).json(newUser);

    }catch(error){
        console.log(error);
        res.status(500).json({err:error.message||"Error al crear el usuario"});
    }
}

//Actualizar un usuario
const updateUser = async (req, res)=>{
    try{
        const id = req.params.id;
        const data = req.body;
        console.log(id, data);

        const updateUser = await userModel.updateUser(id, data);
        if(!updateUser){
            return res.status(404).json({err:error.message||"Usuario no encontrado"});
        }
        res.status(200).json({message:"Usuario actualizado correctamente"});
    }catch (error){
        console.log(error);
        res.status(500).json({err:error.message||"Error al actualizar el usuario"});

    }
}

//Eliminar un usuario
const deleteUser = async (req, res)=>{
    try{
        const id = req.params.id;
        const deleteUser = await userModel.deleteUser(id);
        if(!deleteUser){
            return res.status(404).json({err:error.message||"Usuario no encontrado"});
        }
        res.status(200).json({message:"Usuario eliminado correctamente"});
    }catch(error){
        console.log(error);
        res.status(500).json({err:error.message||"Error al eliminar el usuario"});
    }
}

//Exportar los controladores
module.exports = {
    getUsers,
    getUsersById,
    createUser,
    updateUser,
    deleteUser
}