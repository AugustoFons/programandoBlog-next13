'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
    const { data: session } = useSession(); // const isUserLoggedIn = true; prueba antes de armar la session
    const [providers, setProviders] = useState(null);
    const [toggleMenu, setToggleMenu] = useState(false); //estado para desplegar un menu (crear publicacion & logout;) en mobile.
    
    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
        }, []);
/*  
    useEffect(() => {
        router.push('/')
    }, [signOut]) */
    
    return (
        <nav className="flex-between w-full mb-10 py-3 align-middle">
            <Link href='/' className="flex gap-2 flex-center text-center">
                <Image 
                src='/assets/images/logo.svg'
                alt="logo blog"
                width={40}
                height={40}
                className="object-contain"
                />
                <p className="indigo_gradient logo_text">ProgramandoBlog</p>
            </Link>

            {/* desktop nav  */}
            <div className="sm:flex hidden">
                { session?.user ?(   //antes de armar la session real probar con isUserLoggedIn
                    <div className="flex gap-3 md:gap-5">
                        <Link href='/publicar' className="black_btn">
                            Publicar
                        </Link>
                            <button  type="button" 
                                    className="outline_btn" 
                                    onClick={signOut} 
                                    >
                                    Desconectar
                            </button>
                        <Link href='/perfil'>
                            <Image
                            src={session?.user.image}   // para la prueba usar antes una imagen de '/assets/images/logo.svg'
                            alt="perfil"
                            width={34}
                            height={34}
                            className="rounded-full"
                            />
                        </Link>
                    </div>
                )
                : (
                    <>
                        { providers &&
                            Object.values(providers).map((provider) => (
                                <button type="button" 
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className='black_btn'
                                >
                                    Conectar
                                </button>
                            ))

                        }
                    </>
                )}
            </div>

            {/* mobile-nav */}
            <div className="sm:hidden flex relative">
                {session?.user ?(      //antes de armar la session real probar con isUserLoggedIn
                    <div className="flex">
                        <Image
                            src={session?.user.image}   // para la prueba usar antes una imagen de '/assets/images/logo.svg'
                            alt="perfil"
                            width={37}
                            height={37}
                            className="rounded-full"
                            onClick={() => setToggleMenu((prev) => !prev)} //mejor forma para negar estado anterior, evita errores.
                            />
                        {toggleMenu &&(
                            <div className="dropdown">
                                <Link
                                    href='/perfil'
                                    className="dropdown_link"
                                    onClick={() => setToggleMenu(false)} //se cierra el desplegable
                                    >
                                        Mi Perfil
                                </Link>
                                <Link
                                    href='/publicar'
                                    className="dropdown_link"
                                    onClick={() => setToggleMenu(false)} //se cierra el desplegable
                                    >
                                        Publicar
                                </Link>
                                <button type="button"
                                    onClick={signOut}
                                    className="mt-5 w-full black_btn"
                                    >
                                    Desconectar
                                </button>
                            </div>
                        )}
                    </div>
                ): (
                    <>
                    { providers &&
                        Object.values(providers).map((provider) => (
                            <button type="button" 
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                            className='black_btn'
                            >
                                Conectar
                            </button>
                        ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav