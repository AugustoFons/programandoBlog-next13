import PublicationCard from "./PublicationCard"

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

export default PublicationCardList