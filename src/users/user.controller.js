import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const usuariosGet = async (req = request, res = response) =>{
    const { limite, desde} = req.query;
    const query = {estado: true};

    const[total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    })
}
export const usuariosPost = async (req, res) =>{
    const {name,userName,email,password} = req.body;
    const usuario = new User({name,userName, email,password});
    
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    await usuario.save();

    res.status(200).json({
        usuario
    });
}

export const usuariosPut = async (req, res = response) => {
    try{
        const { id } = req.params;
        const {_id, passwordAnterior, email, ...resto} = req.body;
    
        const usuario = await User.findById(id);
        const verificacionPassword = await bcryptjs.compare(passwordAnterior, usuario.password);
    
        if(!verificacionPassword){
            return res.status(401).json({msg: "The above password is incorrect"});
        }
    
        if(resto.password){
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(resto.password, salt);
        }
    
        await User.findByIdAndUpdate(id, resto);
    
        const updeateUsuario = await User.findById(id);
    
        res.status(200).json({
            msg: 'User successfully updated',
            usario: updeateUsuario
        });
    }catch(e){
        console.error("Error updating user:",e);
        res.status(500).json({msg:"Internal server error"});
    }
   
}