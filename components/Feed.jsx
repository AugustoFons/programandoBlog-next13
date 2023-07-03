'use client'

import PublicationCard from "./PublicationCard"
import { useState, useEffect } from "react"
import SpinnerFeed from "./SpinnerFeed"

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
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    //buscador
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const fetchPost = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/publicaciones", {
                method: "GET",
                next: { revalidate: 10 },   //no configurar cache junto con revalidate pq causa error
            });
            
            const data = await response.json();
            
            setPosts(data);
            setLoading(false);
            
            } catch (error) {
            console.log(error)
            }
        
        };
    useEffect(() =>{
        fetchPost();
    }, []);

    const filterPublication = (search) => {
        const regex = new RegExp(search, "i"); // 'i' flag para busqueda
        return posts.filter(
            (item) =>
            regex.test(item.creator.username) ||
            regex.test(item.tag) ||
            regex.test(item.title) ||
            regex.test(item.publication)
        );
    };

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);
    
        setSearchTimeout(
        setTimeout(() => {
            const searchResult = filterPublication(e.target.value);
            setSearchedResults(searchResult);
            }, 500)
        );
        };
    
    
    const handleTagClick = (tagName) => {
        setSearchText(tagName);
    
        const searchResult = filterPublication(tagName);
        setSearchedResults(searchResult);
    };

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
            {loading && <SpinnerFeed />}
            {searchText ? (
                <PublicationCardList
                    data={searchedResults}
                    handleTagClick={handleTagClick}
                    />
            ) : (
                <PublicationCardList
                    data={posts}
                    handleTagClick={handleTagClick}
                    />
            )}
        </section>
    )
}

export default Feed