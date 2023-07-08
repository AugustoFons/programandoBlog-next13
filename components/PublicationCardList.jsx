import PublicationCard from "./PublicationCard"

const PublicationCardList = ({ data, handleTagClick, setFilterUser, filterUser, setFilterName }) => {

    return (
        <div className="mt-16 publication_layout">
            {filterUser === '' ?
            data.map((post) => (
                <PublicationCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                    filterUser={filterUser}
                    setFilterUser={setFilterUser}
                    setFilterName={setFilterName}
                    />
            ))
                :
                data.filter(post => post.creator === filterUser).map( (post) => (
                    <PublicationCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                    filterUser={filterUser}
                    setFilterUser={setFilterUser}
                    setFilterName={setFilterName}
                    />
                ))
        }
        </div>
    )
}

export default PublicationCardList