
import { request, response } from 'express';
import Publication from './publication.model.js';

export const publicationGet = async (req = request, res = response) => {
   const {limite, desde} = req.body;
   const query = {estado: true};

   const [total, publication] = await Promise.all([
    Publication.countDocuments(query),
    Publication.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
   ])

   res.status(200).json({
    total,
    publication
   })
};

export const publicationPost = async (req, res) => {

    const { title, category, paragraph,  imagenUrl } = req.body;

    try {
        const publication = new Publication({
            title,
            category,
            paragraph,
            imagenUrl
        });

        await publication.save();

        res.status(200).json({
            msg: 'Post added succesfully',
            publication
        });
    } catch (error) {
        console.error('Error to add post:', error);
        res.status(500).json({ error: 'Error to add post' });
    }
};