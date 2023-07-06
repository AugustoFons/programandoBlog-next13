'use client'
import { useState, useEffect } from "react"
import SpinnerFeed from "@components/SpinnerFeed"
import PublicationCardList from "@components/PublicationCardList"
import Search from "@components/Search"
import { useRouter } from "next/navigation"

const alls = 'alls'

const Feed = () => {
    const router = useRouter()
    const [allPosts, setAllPosts] = useState([])
    const [loading, setLoading] = useState(false)

    //estados para el buscador
    const [searchText, setSearchText] = useState("");
    const [searchedResults, setSearchedResults] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/publicaciones/${alls}/posts`, {
                    method: "GET",
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
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">  {/* la subraya significa que la clase viene de globalcss sino es propia de tailwind */}
                Descubrí & Aprende
                <br className="max-md:hidden" /> {/* rompemo el contenido h1 solo en dispositivos pequeños */}
                <span className="indigo_gradient text-center">Compartinos tus Conocimientos</span>
            </h1>
            <p className="desc text-center">Opina, explica y busca información sobre los temas de programación que te interesen. ¡Anímate!</p>
            
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

            </section>
        </section>
    )
}

export default Feed