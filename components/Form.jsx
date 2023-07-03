import Link from "next/link"
import Spinner from "./Spinnerbutton"

const Form = ({ type, description, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex justify-start flex-col">
      <h1 className="head_text text-left">
        <span className="indigo_gradient">{type} Publicación</span>
      </h1>
      <p className="desc text-left max-w-md"> {/* //desc esta en el globals.css para txt de descripcion */}
        {description}
      </p>

      <form
        onSubmit={handleSubmit} /* handlesubmit activa el fetch */
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 form_style"
        >
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Titulo {` `}
            </span>

            <input 
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value})}
              placeholder="Titulo"
              required
              className="form_input"
              />
          </label>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Su Publicación
            </span>

            <textarea 
              value={post.publication}
              onChange={(e) => setPost({ ...post, publication: e.target.value})}
              placeholder="Escriba su publicación aquí..."
              required
              className="form_textarea"
              />
          </label>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Tag {` `}
              <span className="font-extralight text-sm">(#javascript, #mongodb, #softskills...)</span>
            </span>

            <input 
              value={post.tag}
              onChange={(e) => setPost({ ...post, tag: e.target.value})}
              placeholder="#tag"
              required
              className="form_input"
              />
          </label>
          <div className="flex-end mx-3 mb-5 gap-4">
            <Link href='/' className="text-gray-500 text-sm">
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-1.5 text-sm bg-indigo-600 rounded-full text-white"
              >
                {submitting ? <Spinner/> : type}
            </button>
          </div>
        </form>
    </section>
  )
}

export default Form