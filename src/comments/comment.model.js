import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    publication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication',
        required: true
    }
});

export default mongoose.model('Comment', CommentSchema);