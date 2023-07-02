//aqui configuramos nuestros proveedores con la autenticacion de google
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import User from '@models/user'
import { connectToDB } from '@utils/database'

/* console.log({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}) */ //se reciben los id pero cuidado que al principio puede haber un bucle

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
            })
    ],
    callbacks: {
        async session({ session }) {
            // almacena el id de usuario de MongoDB en la sesión
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();
    
            return session
        },
        async signIn({ account, profile, user, credentials }) {
            try {
                await connectToDB();
                //chequear si el usuario existe
                const userExists = await User.findOne({
                    email: profile.email
                });
                //sino crear un usuario
                if(!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true
            } catch (error) {
                console.log("Error checking if user exists: ", error.message);
                return false
            }
        }
    }
})

export { handler as GET, handler as POST}