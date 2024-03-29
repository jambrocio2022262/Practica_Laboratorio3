import bcryptjs from 'bcryptjs'
import Usuario from '../users/user.model.js'
import { generarJWT } from '../helpers/generate-jwt.js'

export const login = async(req, res) =>{
    const{usuario, password} = req.body;

    try{
        const userEmail = await Usuario.findOne({email: usuario});

        const userUsername = await Usuario.findOne({userName: usuario});

        const user = userEmail || userUsername;

        if(!user){
            return res.status(400).json({
                msg: "Credentials are incorrect, email or username does not exist in the database"
            });
        }

        if(!user.estado){
            return res.status(400).json({
                msg: "The user does not exist in the database"
            });
        }

        const validarPassword = bcryptjs.compareSync(password, user.password);
        if(!validarPassword){
            return res.status(400).json({
                msg: "Password is incorrect!!"
            })
        }

        const token = await generarJWT(user.id);

        res.status(200).json({
            msg: "Successful login!",
            usuario: user,
            token
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            msg: "Contact the administrator"
        })
    }
}