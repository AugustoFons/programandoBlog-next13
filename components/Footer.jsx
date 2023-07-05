'use client'

import { Footer } from 'flowbite-react';
import { BsDribble, BsFacebook, BsGithub, BsInstagram, BsTwitter, BsLinkedin } from 'react-icons/bs';

export default function FooterPage() {
  return (
    <Footer className='w-full bg-transparent h-fit outline-0 p-4'>
      <div className="w-full border-transparent flex-col text-end">
        <div className="w-full sm:flex sm:items-center sm:justify-between flex-col gap-3">
        <Footer.Copyright
            by="augustofonsdev@gmail.com"
            href="#"
            year={2023}
            className='text-end'
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="#"
              icon={BsInstagram}
            />
            <Footer.Icon
              href="#"
              icon={BsLinkedin}
            />
            <Footer.Icon
              href="#"
              icon={BsGithub}
            />

          </div>
        </div>
      </div>
    </Footer>
  )
}
