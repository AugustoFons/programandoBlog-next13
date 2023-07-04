import { connectToDB } from "@utils/database";
import PublicationUser from "@models/publication";

export const GET = async (request) => {
    try {
        await connectToDB();
        
        const publications = await PublicationUser.find({}).populate("creator");
        return new Response(JSON.stringify(publications), { 
            status: 200,
        })
    } catch (error) {
        window.location.reload()
        return new Response('Failed to fetch all prompts', {
            status: 500 
        })
    }
}