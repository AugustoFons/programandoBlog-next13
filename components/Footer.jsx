'use client'

import { Footer } from "flowbite-react"

export default function FooterPage() {
  return (
    <Footer container className="w-full bg-transparent border-0 flex">
        <Footer.Copyright 
            by="augustofonsdev@gmail.com"
            href="#"
            year={2023}
            className="w-full bg-transparent border-0 flex items-center justify-center text-center"
        />
    </Footer>
  )
}
