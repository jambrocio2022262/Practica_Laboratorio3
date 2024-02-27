import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        require: [true, "The Name is required"]
    },
    userName: {
        type: String,
        require: [true, "The User is required"]
    },
    email:{
        type: String,
        require: [true, "The Email is required"],
        unique: true
    },
    password:{
        type: String,
        require: [true, "The Paswword is required"]
    },
    estado:{
        type: Boolean,
        default: true
    }

});

UserSchema.methods.toJSON = function(){
    const{ __v, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
};

export default mongoose.model('User',UserSchema);

