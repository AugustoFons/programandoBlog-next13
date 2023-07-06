'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import Form from "@components/Form"

const alls = 'alls'
const EditarPublicacion = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const publicationId = searchParams.get('id') //busca el id en el query de la redireccion del handleEdit

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        title: '',
        publication: '',
        tag: '#',
    });

    useEffect(() => {
        const getOnePublication = async () => {
            const response = await fetch(`/api/publicaciones/${alls}/posts/${publicationId}`) 
            const data = await response.json();

            setPost({
                title: data.title,
                publication: data.publication,
                tag: data.tag
            })
        }
        if(publicationId) getOnePublication();
    }, [publicationId])
    

    // metodo para editar publicacion */
    const editPublicacion = async(e) => {
        e.preventDefault();
        setSubmitting(true)

        if(!publicationId) return  alert('Publication ID not found')
        try {
            const response = await fetch(`/api/publicaciones/${publicationId}` ,  //llamamos a la api que creamos para las nuevas publicaciones
            {
                method: 'PATCH',
                body: JSON.stringify({
                    title: post.title,
                    publication: post.publication,
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
            type="Editar"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={editPublicacion}
            />
    )
}

export default EditarPublicacion