import Feed from "./feed/page"

const Home = () => {

    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">  {/* la subraya significa que la clase viene de globalcss sino es propia de tailwind */}
                Descubrí & Aprende
                <br className="max-md:hidden" /> {/* rompemo el contenido h1 solo en dispositivos pequeños */}
                <span className="indigo_gradient text-center">Compartinos tus Conocimientos</span>
            </h1>
            <p className="desc text-center">Opina, explica y busca información sobre los temas de programación que te interesen. ¡Anímate!</p>
            
            <Feed />
        </section>
    )
}

export default Home