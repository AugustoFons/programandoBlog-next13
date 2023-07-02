'use client'

import PublicationCard from "./PublicationCard"
import { useState, useEffect } from "react"

const PublicationCardList = ({ data, handleTagClick }) => {

    return (
        <div className="mt-16 publication_layout">
            {data.map((post) => (
                <PublicationCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                    />
            ))}
        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState('')
    const [posts, setPosts] = useState([])

    const handleSearchChange = (e) => {

    }

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch("/api/publicaciones"); //  /api/publicaciones
            const data = await response.json();

            setPosts(data)
            console.log(data)
        }

        fetchPost();
    }, []);

    const handleTagClick = (tagName) => {
        setSearchText(tagName);
    };
    console.log(searchText)
    return (
        <section className="feed">
            <form className="relative w-full flex justify-center items-center">
                <input
                    type="text"
                    placeholder="Busca por UserName o por Tag"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                    />
            </form>

            <PublicationCardList
                data={posts}
                handleTagClick={handleTagClick}
                />
        </section>
    )
}

export default Feed