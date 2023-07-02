'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import Form from "@components/Form"

const Publicar = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        title: '',
        publication: '',
        tag: '#',
    });

    /* metodo para publicar */
    const publicar = async(e) => {
        e.preventDefault();
        setSubmitting(true)
        try {
            const response = await fetch('/api/publicaciones/nuevas',  //llamamos a la api que creamos para las nuevas publicaciones
            {
                method: 'POST',
                body: JSON.stringify({
                    title: post.title,
                    publication: post.publication,
                    userId: session?.user.id,
                    tag: post.tag
                })
            });

            if(response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form 
            type="Crear"
            description="Publica y comparti lo que creas que aporte al conocimiento de la comunidad de programadores."
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={publicar}
            />
    )
}

export default Publicar