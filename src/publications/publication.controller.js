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

export const publicationPut = async(req, res = response) =>{
    const{ id } = req.params;
    const{_id, ...resto} = req.body;

    await Publication.findByIdAndUpdate(id, resto);

    const publication = await Publication.findOne({_id: id});

    res.status(200).json({
        msg: 'Updated Publication',
        publication
    });
}

export const publicationDelete = async(req, res) =>{
    const{id} = req.params;

    const publication = await Publication.findByIdAndUpdate(id, {estado: false});
    
    res.status(200).json({msg:'Deleted publication', publication});
}


