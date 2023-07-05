import { connectToDB } from "@utils/database";
import PublicationUser from "@models/publication";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const GET = async (request) => {
    try {
        await connectToDB();
        const publications = await PublicationUser.find({}).populate("creator");

        const path = request.nextUrl.searchParams.get("path") || "/";
        revalidatePath(path);
        return NextResponse.json(publications);

    } catch (error) {
        return new Response('Failed to fetch all prompts', {
            status: 500 
        })
    }
}