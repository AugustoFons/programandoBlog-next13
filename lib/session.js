//aqui configuramos nuestros proveedores con la autenticacion de google
import GoogleProvider from 'next-auth/providers/google'
import User from '@models/user'
import { connectToDB } from '@utils/database'
import { getServerSession } from "next-auth/next";

/* console.log({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}) */ //se reciben los id pero cuidado que al principio puede haber un bucle

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            })
    ],
    callbacks: {
        async session({ session }) {
            // almacena el id de usuario de MongoDB en la sesión, para que el mismo usuario conserve el id cada vez que inicia
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();
    
            return session
        },
        async signIn({ account, profile, user, credentials }) {
            try {
                await connectToDB();
                //chequear si el usuario existe
                const userExists = await User.findOne({
                    email: user.email
                });
                //sino crear un usuario
                if(!userExists) {
                    await User.create({
                        email: user.email,
                        username: user.name.replace(" ", "").toLowerCase(),
                        image: user.image
                    })
                }
                return true
            } catch (error) {
                console.log(error);
                return false
            }
        }
    }
}

export async function getCurrentUser() {
    const session = await getServerSession(authOptions);

    return session;
    }