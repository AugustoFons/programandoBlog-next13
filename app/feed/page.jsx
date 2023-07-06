'use client'

import { useState, useEffect } from "react"
import SpinnerFeed from "@components/SpinnerFeed"
import PublicationCardList from "@components/PublicationCardList"
import Search from "@components/Search"

const Feed = () => {
    const [allPosts, setAllPosts] = useState([])
    const [loading, setLoading] = useState(false)
    //buscador estados
    const [searchText, setSearchText] = useState("");
    const [searchedResults, setSearchedResults] = useState([]);


    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/publicaciones', {
                    cache: "no-cache",
                    next: { revalidate: 60 },
                }); 
                const data = await response.json();
    
                setAllPosts(data);
                setSearchedResults(data)
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
        fetchPost()
        }, [])

    const handleTagClick = (tagName) => {
        setSearchText(tagName.toLowerCase());
    };

    return (
        <section className="feed">
                <Search setSearchText={setSearchText} searchText={searchText} allPosts={allPosts} setSearchedResults={setSearchedResults}/>
                {loading && <SpinnerFeed />}
                
                {searchText ?
                    <PublicationCardList
                        data={searchedResults}
                        handleTagClick={handleTagClick}
                        />
                    :
                    <PublicationCardList
                        data={allPosts}
                        handleTagClick={handleTagClick}
                        />
                }

            </section>    )
}

export default Feed