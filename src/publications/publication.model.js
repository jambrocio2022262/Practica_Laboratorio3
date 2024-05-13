import mongoose from "mongoose";

const PublicationSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    category:{
        type: String,
        require: true
    },
    paragraph:{
        type: String,
        require: [true, "The Text is required"]
    },
    /*comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],*/
    imagenUrl:{
        type: String,
        require: true
    },
    estado:{
        type: Boolean,
        default: true
    }
});


export default mongoose.model('Publication', PublicationSchema);