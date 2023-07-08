import PublicationCardList from "@components/PublicationCardList"

const ProfileUser = ({data, handleTagClick, setFilterUser, filterUser, filterName}) => {

return (
    <section className='w-full'>
        <h1 className='head_text text-left'>
            <span className='indigo_gradient'>{`${filterName}`}</span>
        </h1>
        
        <p className='desc text-left'>{`Bienvenido al perfil de ${filterName}, aquí puede leer todas sus publicaciones`}</p>
        <PublicationCardList
            data={data}
            handleTagClick={handleTagClick}
            filterUser={filterUser}
            setFilterUser={setFilterUser}
            />
    </section>
    )
}

export default ProfileUser