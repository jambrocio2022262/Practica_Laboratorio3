import User from '../users/user.model.js';
import Publication from '../publications/publication.model.js';

export const existenteEmail = async (email = '') => {
    const existeEmail = await User.findOne({email});
    if (existeEmail){
        throw new Error(`El email ${email} has already been registered`);
    }
}

export const existenteUserName = async (userName = '') => {
    const existeUserName = await User.findOne({userName});
    if (existeUserName){
        throw new Error(`The user name  ${userName} was registered`);
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario){
        throw new Error(`El ID: ${correo} No existe`);
    }
}

export const existePublicationById = async (id = '') => {
    const existePublication = await Publication.findById(id);
    if (!existePublication){
        throw new Error(`El ID: ${title} No existe`);
    }
}