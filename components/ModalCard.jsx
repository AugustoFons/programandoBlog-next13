'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import Image from 'next/image';

export default function ModalCard({post}) {
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };

    return (
    <>
        <Button color={'none'} size="xs" className='bg-indigo-500 text-white rounded-full outline-1 text-xs' onClick={() => props.setOpenModal('default')}>Abrir</Button>
        <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal()}>
            <Modal.Header>
                <div
                    className="flex-1 flex justify-start cursor-pointer items-center gap-3 profile"
                    >
                    <Image
                        src={post.creator.image}
                        alt="user image"
                        width={40}
                        height={40}
                        className="rounded-full object-contain"
                        />
                    <div className="flex flex-col">
                        <h3 className="font-satoshi font-semibolt text-gray-900">
                            {post.creator.username}
                        </h3>
                        <p className="font-inter text-sm text-gray-500">
                            {post.creator.email}
                        </p>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {post.publication}
                    </p>
                </div>    
            </Modal.Body>
            <Modal.Footer>
                <Button color="none" className='indigo_gradient rounded-full' onClick={() => props.setOpenModal()}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    </>
)
}


