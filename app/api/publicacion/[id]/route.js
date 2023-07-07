import { connectToDB } from "@utils/database";
import PublicationUser from "@models/publication";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const publication = await PublicationUser.findById(params.id);

        return new Response(JSON.stringify(publication), { status: 200,
            headers: {
                "content-type": "application/json",
                "cache-control":
                "private, no-cache, no-store, max-age=0, must-revalidate",
            },
        });
    } catch (error) {
        return new Response("Failed to fetch all Publications", { status: 500 });
    }
};

export const PATCH = async (req, { params }) => {
    const { title, publication, tag} = await req.json();
    try {
        await connectToDB();

        const existingPublication = await PublicationUser.findById(params.id);
        if (!existingPublication)
            return new Response("Publication not found", { status: 404 });
            existingPublication.publication = publication;
            existingPublication.title = title;
            existingPublication.tag = tag;

        await existingPublication.save();

        return new Response(JSON.stringify(existingPublication), { status: 200 });
    } catch (error) {
    return new Response("Failed to update publication", { status: 500 });
    }
};

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();

        await PublicationUser.findByIdAndRemove(params.id);

        return new Response("Publication deleted", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete publication", { status: 500 });
    } 
};
