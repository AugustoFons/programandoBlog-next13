'use client'

import { Footer } from 'flowbite-react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';

export default function FooterPage() {
  return (
    <Footer className='w-full bg-transparent h-fit outline-0 p-4'>
      <div className="w-full border-transparent flex-col text-end">
        <div className="w-full sm:flex sm:items-center sm:justify-center flex-col gap-3">
        <Footer.Copyright
            by="augustofonsdev@gmail.com"
            href="#"
            year={2023}
            className='text-center'
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 justify-center">
            <Footer.Icon
              href="https://www.linkedin.com/in/augustofons"
              icon={BsLinkedin}
            />
            <Footer.Icon
              href="https://github.com/AugustoFons"
              icon={BsGithub}
            />

          </div>
        </div>
      </div>
    </Footer>
  )
}
