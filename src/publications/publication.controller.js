import { response, request } from "express";
import Publication from './publication.model.js';

export const publicationGet = async (req = request, res = response) =>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    const[total, publication] = await Promise.all([
        Publication.countDocuments(query),
        Publication.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        publication
    })
}

export const publicationPost = async (req, res) =>{
    const {title, category , paragraph} = req.body;
    const publication = new Publication({title, category , paragraph});

    await publication.save();

    res.status(200).json({
        publication
    });
}

