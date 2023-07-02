'use client'

import {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'

const MiPerfil = () => {
    const router = useRouter();
    const { data: session } = useSession();
    
    const [posts, setPosts] = useState([])

    useEffect(() =>{
        const fetchPost = async () => {
        const response = await fetch(`/api/usuarios/${session?.user.id}/posts`); //  /api/publicaciones
        const data = await response.json();
        setPosts(data)
        }
        
        if(session?.user.id) fetchPost();
    }, [session?.user.id]);

    const handleEdit = (post) => {
        router.push(`/editar-publicacion?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const confirmation = confirm('¿Estás seguro de que quieres eliminar la publicación?')

        if(confirmation) {
            try {
                await fetch(`/api/publicaciones/${post._id}`, {
                    method: 'DELETE',
                });

                const filterPost = posts.filter((el) => el._id !== post._id);   //devuelve los post no eliminados
                setPosts(filterPost)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Profile
            name={session?.user.name}
            description= 'Bienvenido a su perfil, aquí puede gestionar todas sus publicaciones.'
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            />
    )
}

export default MiPerfil