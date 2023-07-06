'use client'
import { useEffect } from "react";

const Search = ({searchText, setSearchText, setSearchedResults, allPosts}) => {
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

    return (
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
    )
}

export default Search