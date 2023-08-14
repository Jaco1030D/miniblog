import styles from './Home.module.css'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import PostDetails from '../../Components/PostDetails'

const Home = () => {
  const [query, setQuery] = useState("")
  const {documents: posts, loading} = useFetchDocuments("posts")//Posts é a collection criada no banco de dados
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (query) {
      return navigate(`/search?q=${query}`)
      
    }
  }
  return (
    <div className={styles.home} >
        <h1>Veja nossos posts</h1>
        <form onSubmit={handleSubmit} className={styles.search_form} >
          <input type="text" 
          placeholder='Ou busque por tegs...'  
          onChange={(e) => setQuery(e.target.value)}/>

          <button className='btn btn-dark' >Pesquisar</button>
        </form>
        <div>
          {loading && <p>Carregando</p>}
          {posts && posts.map((post) => <PostDetails key={post.id} post={post} />)}
          {posts && posts.length === 0 &&(
            <div className={styles.noposts} >
              <p>Não foram encontrados posts</p>
              <Link to="/post/create" className='btn' >
                Criar primeiro post
              </Link>
            </div>
          )}
        </div>
    </div>
  )
}

export default Home