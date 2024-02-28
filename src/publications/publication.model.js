import mongoose from "mongoose";

const PublicationSchema = mongoose.Schema({
    title:{
        type: String,
        require: [true, "The Title is required"]
    },
    category:{
        type: String,
        require: [true, "The Category is required"]
    },
    text:{
        type: String,
        require: [true, "The Text is required"]
    },
    estado:{
        type: String,
        default: true
    }
});

PublicationSchema.methods.toJSON = function(){
    const{__v, _id, ...publication} = this.toObject();
    publication.uid = _id;
    return publicationl
};

export default mongoose.model('Publication', PublicationSchema);