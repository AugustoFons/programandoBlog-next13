'use client'

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PublicationCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();

    const [copied, setCopied] = useState("");
    const handleCopy = () => {
            setCopied(post.publication);
            navigator.clipboard.writeText(post.publication);
            setTimeout(() => setCopied(""), 3000)
        }

    const sliceTag = () => {    //funcion para separa los tags si se escriben mas de uno
        const tags = post.tag.split("#").filter(tag => tag).map((tag, index) => (
            <span 
                key={index}
                onClick={() => handleTagClick && handleTagClick(tag)}  //cuando apreto el tag handleclick toma su valor para mostrar etiquetas relacionadas
                className="inline-flex font-semibold text-sm cursor-pointer bg-gray-200 rounded-full mx-1 px-2 py-1 text-indigo-500 items-center hover:text-indigo-700"
                >
                <p className="font-black text-xl">#</p>{tag}
            </span>
        ))
        return tags
        }
        const tagList = sliceTag()

    return (
        <div className="publication_card">
            <div className="flex justify-between items-center -mt-5 py-1">
                <div className="flex items-center gap-1">
                    <div className="">
                            <Image
                                src={post.creator.image}
                                alt='foto de usuario'
                                width={36}
                                height={36}
                                className="rounded-full object-contain border-2 cursor-pointer border-indigo-300 hover:border-indigo-400"
                            />
                    </div>
                    <h3 className='font-inter text-sm cursor-pointer text-gray-500 hover:text-indigo-400'>
                        {post.creator.username}
                    </h3>
                </div>

                <div className="copy_btn" onClick={handleCopy}>
                    <Image
                        src={copied === post.publication
                            ? '/assets/icons/tick.svg'
                            : '/assets/icons/copy.svg'
                        }
                        width={12}
                        height={12}
                        alt="copy"
                        />
                </div>
            </div>

            <div className="flex-col">
                <h2 class="text-gray-800 text-xl font-semibold text-center">{post.title}</h2>
                <p class="my-2 font-satoshi text-sm text-gray-700">{post.publication}</p>
            </div>
            <div >
                {tagList}
            </div>

            {session?.user.id === post.creator._id && 
            pathName === '/perfil' && (
                <div className="mt-5 flex justify-center items-center gap-4 border-t border-gray-300 pt-3 ">
                    <p className="font-semibold text-sm cursor-pointer text-indigo-500  bg-slate-200 p-2 rounded-full hover:text-indigo-900 "
                        onClick={handleEdit}
                        >
                            Editar
                    </p>
                    <p className="font-semibold text-sm cursor-pointer text-[#FC6E8B] bg-slate-200 p-2 rounded-full hover:text-[#fc2d56]"
                        onClick={handleDelete}
                        >
                            Borrar
                    </p>
                </div>
            )

            }
        </div>
    )
}

export default PublicationCard