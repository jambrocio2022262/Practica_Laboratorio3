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
    paragraph:{
        type: String,
        require: [true, "The Text is required"]
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


export default mongoose.model('Publication', PublicationSchema);