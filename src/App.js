import './App.css';

import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import { AuthProvider } from './Context/AuthContext';
import { useAuthentication } from './hooks/useAuthentication';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import CreatePost from './Pages/Createpost/CreatePost';
import Dashboard from './Pages/Dashboard/Dashboard';
import Search from './Pages/Search/Search';
import Post from './Pages/Post/Post';
import Edit from './Pages/Edit/Edit';


function App() {
  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()
  const  loadingUser = user === undefined //devolve true ou false

  useEffect(() =>{
    onAuthStateChanged(auth, (user) =>{
      setUser(user)
    })
  }, [auth])
  if (loadingUser) {
    return <p>Aguarda fazendo o favor...</p>
  }
  return (
    <div className="App">
      <AuthProvider value={{user}} >
      <BrowserRouter>
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/post/:id' element={<Post/>}/>
          <Route path='/login' element={
            !user ? <Login/> : <Navigate to="/" />
          }/>
          <Route path='/register' element={
            !user ? <Register/> : <Navigate to="/" />
            }/>
          <Route path='/post/create' element={
            user ? <CreatePost/> : <Navigate to="/login" />
            }/>
            <Route path='/post/edit/:id' element={
              user ? <Edit/> : <Navigate to="/login" />
              }/>
          <Route path='/dashboard' element={
            user ? <Dashboard/> : <Navigate to="/login" />
            }/>
        </Routes>
      </div>
      <Footer/>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
