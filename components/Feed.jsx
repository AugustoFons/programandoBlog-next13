'use client'

import PublicationCard from "./PublicationCard"
import { useState, useEffect } from "react"
import SpinnerFeed from "./SpinnerFeed"

const blog = 'blog';
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
    const [allPosts, setAllPosts] = useState([])
    const [checkGet, setCheckGet] = useState(false)
    const [loading, setLoading] = useState(false)
    //buscador
    const [searchText, setSearchText] = useState("");
    const [searchedResults, setSearchedResults] = useState([]);
    
    useEffect(() => {
        setCheckGet(true)
    }, [])
    
    const fetchPost = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/publicacionesApi/${blog}`);   
            const data = await response.json();
            
            setAllPosts(data);
            setSearchedResults(data)
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchPost()
    }, [checkGet])
    

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
                    placeholder="Busca por UserName o por Tag"
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