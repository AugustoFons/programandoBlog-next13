import { connectToDB } from "@utils/database";
import PublicationUser from "@models/publication";

export const POST = async (req) => {
    const { userId, title, publication, tag } = await req.json();  //userId viene de la session de google , identifica al usuario

    try {
        await connectToDB();
        const newPublication = new PublicationUser({
            creator: userId,
            title,
            publication,
            tag
        });
        await newPublication.save();
        
        return new Response(JSON.stringify(newPublication), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new publication", { status: 500 });
    }
}