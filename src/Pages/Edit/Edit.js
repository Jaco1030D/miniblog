import styles from './Edit.module.css'
import {useEffect, useState} from 'react'
import {useAuthValue} from "../../Context/AuthContext"
import {useNavigate, useParams} from "react-router-dom"
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
const Edit = () => {
    const {id} = useParams()
    const {document: post} = useFetchDocument("posts", id)
    const [title, setTitle] = useState('')
    const [img, setImg] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState('')
    const [formError, setFormError] = useState("")
    const navigate = useNavigate()
    const {user} = useAuthValue()
    const {updateDocument, response} = useUpdateDocument("posts")
    useEffect(() => {
        if (post) { //tem q ter pra saber sabe se o dado chego
            setTitle(post.title)
            setBody(post.body)
            setImg(post.img)
            const tags = post.tagsArray.join(", ")
            setTags(tags)
        }
    }, [post])
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
        const data = {
            title,
            img,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        
            }
        updateDocument(id, data)
        navigate("/dashboard")
    }

    return (
        <div className={styles.edit} >
            {post && (
                <>
                <h2>Edite seu post</h2>
            <p>Altere os dados do post</p>
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
            <p className={styles.preview_title} >Preview da imagem</p>
            <img className={styles.img_preview} src={post.img} alt={post.title} />
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
            
                {!response.loading && <button className='btn' >Editar</button> }
                {response.loading && <button className='btn' disabled>Aguarde...</button> }
                
                {response.error && <p className='error' >{response.error}</p>}
                {formError && <p className='error' >{formError}</p>}
    
            </form>
                </>
            )}
        </div>
  )
}

export default Edit