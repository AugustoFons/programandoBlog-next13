'use client'

import PublicationCardList from "@components/PublicationCardList"
import { useState, useEffect } from "react"
import SpinnerFeed from "@components/SpinnerFeed"


const Feed = () => {
    const [allPosts, setAllPosts] = useState([])
    const [loading, setLoading] = useState(false)
    //buscador
    const [searchText, setSearchText] = useState("");
    const [searchedResults, setSearchedResults] = useState([]);

    const fetchPost = async () => {
            setLoading(true);
            const response = await fetch('/api/publicaciones', {
                cache: 'no-store',
            });   
            const data = await response.json();
            setAllPosts(data);
            setSearchedResults(data)
            setLoading(false);
    };

    useEffect(() => {
        fetchPost()
    }, [])
    
    

    useEffect(() => {
        const filteredPosts = allPosts.filter(
        (p) =>
            p.creator.username.toLowerCase().includes(searchText) ||
            p.tag.toLowerCase().includes(searchText) ||
            p.publication.toLowerCase().includes(searchText) ||
            p.title.toLowerCase().includes(searchText)
        );
        setSearchedResults(filteredPosts);
    }, [searchText]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value.toLowerCase());
        };
    
    const handleTagClick = (tagName) => {
        setSearchText(tagName.toLowerCase());
    };

    return (
        <section className="feed">
            <div className="relative w-full flex justify-center items-center">
                <input
                    type="text"
                    placeholder="Busca por nombre de usuario, por contenido o tags ..."
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                    />
            </div>
            {loading && <SpinnerFeed />}
                <PublicationCardList
                    data={searchedResults}
                    handleTagClick={handleTagClick}
                    />
        </section>
    )
}

export default Feed