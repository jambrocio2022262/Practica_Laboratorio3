import User from '../users/user.model.js';

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