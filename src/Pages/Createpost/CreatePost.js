import styles from './Create.module.css'
import {useState} from 'react'
import { useInsertDocuments } from '../../hooks/useInsertDocuments'
import {useAuthValue} from "../../Context/AuthContext"
import {useNavigate} from "react-router-dom"
const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [img, setImg] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState("")
  const [formError, setFormError] = useState("")
  const navigate = useNavigate()
  const {user} = useAuthValue()
  const {insertDocument, response} = useInsertDocuments("posts")
   
  const handleSubmit = (e) =>{
    e.preventDefault()
    setFormError("")
    //validar a url
    try {
      new URL(img)
    } catch (error) {
      setFormError("A imgaem deve ser uma url")
    }
    //crias array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

    //Chegar todos os valores
    if (!title || !img || !tags || !body) {
      setFormError("Por favor, preencha todos os campos")
    }
    //inseri os bagui
    if (formError) return
    insertDocument({
      title,
      img,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
  
    })
    navigate("/")
  }

  return (
    <div className={styles.create_post} >
        <h2>Criar post</h2>
        <p>Escreva o que quiser</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Titulo</span>
            <input type="text" name='title' required placeholder='Digite o titulo' 
            onChange={(e) => setTitle(e.target.value)} value={title}/>
          </label>
          <label>
            <span>Imagem</span>
            <input type="text" name='img' required placeholder='coloque uma URL da imagem' 
            onChange={(e) => setImg(e.target.value)} value={img}/>
          </label>
          <label>
            <span>Conteudo</span>
            <textarea name="body" required placeholder='Digite o conteudo' 
            onChange={(e) => setBody(e.target.value)} value={body}></textarea>
          </label>
          <label>
            <span>Tags</span>
            <input type="text" name='tags' required placeholder='Digite as tags separadas por virgula' 
            onChange={(e) => setTags(e.target.value)} value={tags}/>
          </label>
          
            {!response.loading && <button className='btn' >Cadastrar</button> }
            {response.loading && <button className='btn' disabled>Aguarde...</button> }
            
            {response.error && <p className='error' >{response.error}</p>}
            {formError && <p className='error' >{formError}</p>}
  
        </form>
    </div>
  )
}

export default CreatePost