import Comment from './comment.model.js';
import Publication from '../publications/publication.model.js';

export const commentPost = async (req, res) => {
    const { nombre, email, content, idPublicacion } = req.body;

    try {
        const publication = await Publication.findById(idPublicacion);

        if (!publication) {
            return res.status(404).json({ msg: 'Publication not found' });
        }

        const comment = new Comment({
            nombre,
            email,
            content,
            publication: idPublicacion
        });

        await comment.save();

        publication.comments.push(comment._id);
        await publication.save();

        
        res.status(201).json({
            msg: 'Comment added correctly',
            comment
        });
        
    } catch (error) {
        console.error('Error, cannot add comment', error);
        res.status(500).json({ error: 'Error, cannor add comment'});
    }

};


export const commentGet = async (req , res) => {
    try {
        const comment = await Comment.find();

        res.status(200).json(comment);
    } catch (error) {
        console.error('Error al obtener los comentarios', error)
        res.status(500).json({error: 'Error al obtener los comentatios'})
    }
};

/*export const commentPut = async (req, res) => {
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
}; */