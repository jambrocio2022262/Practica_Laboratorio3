import { response, request } from "express";
import Publication from './publication.model.js';
import User from '../users/user.model.js';

export const publicationGet = async (req, res) => {
    try {
        const publications = await Publication.find().populate({
            path: 'usuario', 
            select: 'email _id' 
        });

        res.status(200).json(publications);
    } catch (error) {
        console.error('Error to get post:', error);
        res.status(500).json({ error: 'Error to get post' });
    }
};

export const publicationPost = async (req, res) => {
    const user = req.usuario;

    const { title, category, paragraph } = req.body;

    try {
        const publication = new Publication({
            title,
            category,
            paragraph,
            usuario: user._id,
        });

        await publication.save();

        const usuario = await User.findById(user._id);

        res.status(200).json({
            msg: 'Post added succesfully',
            publication: {
                ...publication.toObject(),
                usuario: usuario.correo
            }
        });
    } catch (error) {
        console.error('Error to add post:', error);
        res.status(500).json({ error: 'Error to add post' });
    }
};



export const publicationPut = async (req, res) => {
    const user = req.usuario;
    const publicationId = req.params.id;
    const { title, category, paragraph } = req.body;

    try {
        const publication = await Publication.findById(publicationId);

        if (!publication) {
            return res.status(404).json({ msg: 'The post dont not  exist' });
        }

        if (publication.usuario.toString() !== user._id.toString()) {
            return res.status(403).json({ msg: 'You do not have access to edit this post' });
        }

        publication.title = title;
        publication.category = category;
        publication.paragraph = paragraph;

        await publication.save();

        res.status(200).json({ msg: 'Post update succesfully', publication });
    } catch (error) {
        console.error('Error to update post:', error);
        res.status(500).json({ error: 'Error to update post' });
    }
};


export const publicationDelete = async (req, res) => {
    const user = req.usuario;
    const publicationId = req.params.id;

    try {
        const publication = await Publication.findById(publicationId);

        if (!publication) {
            return res.status(404).json({ msg: 'The post do not exist' });
        }

        if (publication.usuario.toString() !== user._id.toString()) {
            return res.status(403).json({ msg: 'You do not have access to delete this post' });
        }

        await Publication.findByIdAndDelete(publicationId);

        res.status(200).json({ msg: 'Post delete succesfully' });
    } catch (error) {
        console.error('Error to delete post:', error);
        res.status(500).json({ error: 'Error to delete post' });
    }
};
