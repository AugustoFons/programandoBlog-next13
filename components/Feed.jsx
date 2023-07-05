'use client'

import { useState, useEffect } from "react"
import SpinnerFeed from "./SpinnerFeed"
import PublicationCardList from "./PublicationCardList"

const Feed = () => {
    const [allPosts, setAllPosts] = useState([])
    const [loading, setLoading] = useState(false)
    //buscador
    const [searchText, setSearchText] = useState("");
    const [searchedResults, setSearchedResults] = useState([]);
    
    const fetchPost = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/publicaciones', {
                cache: 'no-store',
            });   
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
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">  {/* la subraya significa que la clase viene de globalcss sino es propia de tailwind */}
                Descubrí & Aprende
                <br className="max-md:hidden" /> {/* rompemo el contenido h1 solo en dispositivos pequeños */}
                <span className="indigo_gradient text-center">Compartinos tus Conocimientos</span>
            </h1>
            <p className="desc text-center">Opina, explica y busca información sobre los temas de programación que te interesen. ¡Anímate!</p>
            
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
        </section>
    )
}

export default Feed