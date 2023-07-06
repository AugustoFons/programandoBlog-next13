import { connectToDB } from "@utils/database";
import PublicationUser from "@models/publication";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const publication = await PublicationUser.findById(params.id).populate("creator");
        if (!publication) return new Response("Prompt not found", { status: 404 });

        return new Response(JSON.stringify(publication), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
};

export const PATCH = async (req, { params }) => {
    const { title, publication, tag} = await req.json();
    try {
        await connectToDB();

        const existingPublication = await PublicationUser.findById(params.id);
        if (!existingPublication)
            return new Response("Prompt not found", { status: 404 });
            existingPublication.publication = publication;
            existingPublication.title = title;
            existingPublication.tag = tag;

        await existingPublication.save();

        return new Response(JSON.stringify(existingPublication), { status: 200 });
    } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
    }
};

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();

        await PublicationUser.findByIdAndRemove(params.id);

        return new Response("Prompt deleted", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 });
    } 
};
