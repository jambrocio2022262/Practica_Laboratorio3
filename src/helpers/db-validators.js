import Publication from '../publications/publication.model.js';


export const existePublicationById = async (id = '') => {
    const existePublication = await Publication.findById(id);
    if (!existePublication){
        throw new Error(`El ID: ${title} No existe`);
    }
}