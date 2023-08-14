import styles from './Dashboard.module.css'

import {useAuthValue} from "../../Context/AuthContext"
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import {Link} from "react-router-dom"
import { useDeleteDocuments } from '../../hooks/useDeleteDocuments'
const Dashboard = () => {
  const {user} = useAuthValue()
  const uid = user.uid
  const {deleteDocument} = useDeleteDocuments("posts")
  const {documents: posts,loading} = useFetchDocuments("posts", null, uid)
  if (loading) {
    return <p>Carregando...</p>
  }
  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie seus post</p>
      {posts && posts.length === 0 ? (
        <div className={styles.nopost} >
          <p>Não foram encontrados posts</p>
          <Link to='/post/create' className='btn'>
            criar primeiro post
          </Link>
        </div>
      ) : (
        <>
        <div className={styles.post_header} >
          <span>Título</span>
          <span>Ações</span>
        </div>
        
        
        { posts && posts.map((post) => (
          <div key={post.id} className={styles.post_row} >
            <p>{post.title}</p>
            <div>
              <Link to={`/post/${post.id}`} className='btn btn-outline' >
              Ver
              </Link>
              <Link to={`/post/edit/${post.id}`} className='btn btn-outline' >
              Editar
              </Link>
              <button onClick={() => deleteDocument(post.id)} className="btn btn-outline btn-danger">
                Excluir
              </button>
            </div>
          </div>
        ))}
        </>
        
      )}
    </div>
  )
}

export default Dashboard