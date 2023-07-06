import { connectToDB } from "@utils/database";
import PublicationUser from "@models/publication";

//GET
export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        
        const publication = await PublicationUser.findById(params.id).populate('creator');
        if(!publication) return new Response('publication not found', {status: 404})

        return new Response(JSON.stringify(publication), { status: 200 })
    } catch (error) {
        return new Response('Failed to fetch all prompts', { status: 500 })
    }
}

//PATCH
export const PATCH = async (request, { params }) => {
    const { title, publication, tag} = await request.json();
    try {
        await connectToDB();

        const existingPublication = await PublicationUser.findById(params.id);
        if(!existingPublication) return new Response('Publication not found', {status: 404})

        existingPublication.title = title;
        existingPublication.publication = publication;
        existingPublication.tag = tag;

        await existingPublication.save();
        return new Response(JSON.stringify(existingPublication), { status: 200 })
    } catch (error) {
        return new Response('Failed to update publication', { status: 500 })
    }
}

//DELETE
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await PublicationUser.findByIdAndRemove(params.id)
        return new Response('Publication deleted successfully', { status: 200 })
    } catch (error) {
        return new Response('Failed to delete publication', { status: 500 })
    }
}
