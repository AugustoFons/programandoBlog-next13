'use client'

import { useState, useEffect } from "react"
import Feed from "./feed/Feed"

const Home = () => {
    const [allPosts, setAllPosts] = useState([])
    const [loading, setLoading] = useState(false)
    
    //estados para el buscador
    const [searchText, setSearchText] = useState("");
    const [searchedResults, setSearchedResults] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/publicaciones', {
                    cache: "no-store",
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
    return (
        <section>
            
            <Feed
                allPosts={allPosts}
                setAllPosts={setAllPosts}
                loading={loading}
                setLoading={setLoading}
                searchText={searchText}
                setSearchText={setSearchText}
                setSearchedResults={setSearchedResults}
                searchedResults={searchedResults}   
                />
        </section>
    )
}

export default Home