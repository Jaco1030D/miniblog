import React from 'react'
import { Link } from 'react-router-dom'
import PostDetails from '../../Components/PostDetails'
import {useFetchDocuments} from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'
import styles from './Search.module.css'

const Search = () => {
  
  const query = useQuery()
  const search = query.get("q")
  const {documents: posts} = useFetchDocuments("posts", search)
  return (
    <div className={styles.Search_container} >
      <h2>Search</h2>
      {posts && posts.length === 0 && (
        <div className={styles.noposts}>
        <p>Não foram encontrados posts...</p>
        <Link to="/" className='btn btn-dark' >Voltar</Link></div>
      )}
      {posts && posts.map((post) => <PostDetails key={post.id}post={post}/>)}
    </div>
  )
}

export default Search