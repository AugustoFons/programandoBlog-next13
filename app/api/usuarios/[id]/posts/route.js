import { connectToDB } from "@utils/database";
import PublicationUser from "@models/publication";

export const GET = async (request, { params }) => { //al estar en la carpeta [id] tenemos acceso a params.id
    
    try {
        await connectToDB();
        
        const publications = await PublicationUser.find({  creator: params.id }).populate('creator');
        return new Response(JSON.stringify(publications), { status: 200 })
    } catch (error) {
        return new Response('Failed to fetch all publication', { status: 500 })
    }
}