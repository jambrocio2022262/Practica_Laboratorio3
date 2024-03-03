import Comment from './comment.model.js';
import User from '../users/user.model.js';
import Publication from '../publications/publication.model.js';

export const commentPost = async (req, res) => {
    const user = req.usuario;
    const { content, idPublicacion } = req.body;

    try {
        const publication = await Publication.findById(idPublicacion);

        if (!publication) {
            return res.status(404).json({ msg: 'Publication not found' });
        }

        const comment = new Comment({
            content,
            usuario: user._id,
            publication: idPublicacion
        });

        await comment.save();

        const usuario = await User.findById(user._id);

        res.status(201).json({
            msg: 'Comment added correctly',
            comment: {
                ...comment.toObject(),
                tituloPublicacion: publication.title,
                usuario: usuario.email
            }
        });
        
    } catch (error) {
        console.error('Error, cannot add comment', error);
        res.status(500).json({ error: 'Error, cannor add comment'});
    }

};


export const commentGet = async (req, res) => {
    try {
        const comment = await Comment.find().populate({
            path: 'usuario', 
            select: 'email _id' 
        });

        res.status(200).json(comment);
    } catch (error) {
        console.error('Error to get post:', error);
        res.status(500).json({ error: 'Error to get post' });
    }
};

export const commentPut = async (req, res) => {
    const user = req.usuario;
    const commentId = req.params.id;
    const { content } = req.body;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ msg: 'The comment does not exist' });
        }

        if (comment.usuario.toString() !== user._id.toString()) {
            return res.status(403).json({ msg: 'You do not have access to edit this comment' });
        }

        comment.content = content;

        await comment.save();

        res.status(200).json({ msg: 'Comment updated successfully', comment });
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ error: 'Error updating comment' });
    }
}


export const commentDelete = async (req, res) => {
    const user = req.usuario;
    const commentId = req.params.id;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ msg: 'The comment does not exist' });
        }

        if (comment.usuario.toString() !== user._id.toString()) {
            return res.status(403).json({ msg: 'You do not have access to delete this comment' });
        }

        await Comment.findByIdAndDelete(commentId);

        res.status(200).json({ msg: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Error deleting comment' });
    }
}; 