import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    content: {
        type: String,
        required: true
    },
    publication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication',
        required: true
    },
    estado:{
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Comment', CommentSchema);