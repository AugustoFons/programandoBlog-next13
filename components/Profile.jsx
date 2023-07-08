import PublicationCard from "./PublicationCard"

const Profile = ({ name, description, data, handleEdit, handleDelete }) => {

    return (
        <section className='w-full'>
            <h1 className='head_text text-left'>
                <span className='indigo_gradient'>{name}</span>
            </h1>
            <p className='desc text-left'>{description}</p>

            <div className="mt-10 publication_layout min-h-screen">
                {data.map((post) => (
                    <PublicationCard
                        key={post._id}
                        post={post}
                        handleEdit={() => handleEdit && handleEdit(post)}
                        handleDelete={() => handleDelete && handleDelete(post)}
                        />
                ))}
            </div>
        </section>
    )
}

export default Profile