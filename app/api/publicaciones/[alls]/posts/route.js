import { connectToDB } from "@utils/database";
import PublicationUser from "@models/publication";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        
        const publication = await PublicationUser.find({}).populate('creator');

        return new Response(JSON.stringify(publication), { status: 200,
            headers: {
                "content-type": "application/json",
                "cache-control":
                "private, no-cache, no-store, max-age=0, must-revalidate",
            },
        })
    } catch (error) {
        return new Response('Failed to fetch all prompts', { status: 500 })
    }
}