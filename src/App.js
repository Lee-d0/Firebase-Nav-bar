import logo from './logo.svg';
import './App.css';
import React from 'react'
import { auth, db }  from './firebase/init'
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc  } from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut , onAuthStateChanged } from "firebase/auth";
let loggedin = false

function App() {
  const [user, setUser] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  
 async function updatePost(){
    const hardCodedId = "J9HpdlLnVBKa5wm9Zttz"
    const postRef = doc(db, "posts", hardCodedId)
    const post = await getPostById(hardCodedId)
    console.log(post)
    const newPost = {
      ...post,
      title: "Land a 400k job",
      
    }
    console.log(newPost)
    updateDoc(postRef, newPost)
  }
  function deletePost(){
    const hardCodedId = "J9HpdlLnVBKa5wm9Zttz"
    const postRef = doc(db, "posts", hardCodedId)
    deleteDoc(postRef)
  }
  
  function createPost(){
    const post = {
      title: "Finish Interview Section",
      desscription: "Do Frontened Simplified",
      uid: user.uid,
    }

    addDoc(collection(db, "posts"), post)
  }


  async function getAllPost() {
    const { docs } = await getDocs(collection(db, "posts"))
    const posts = docs.map(elem => ({...elem.data(), id:elem.id }))
    console.log(posts)
  }

  async function getPostById(id) {
    
    const postRef = doc(db, "posts", id)
    const postSnap = await getDoc(postRef)
    return postSnap.data()
    
  }

  async function getPostByUid() {
    const postCollectioRef = await query(
      collection(db, "posts"),
      where("uid", "==", "1")
    )
    const { docs } = await getDocs(postCollectioRef)
    console.log(docs.map(doc => doc.data()))
  }

  React.useEffect(() => {
      const unsubscribe = 
    onAuthStateChanged(auth, (user) => {
      setLoading(false)
      
      if(user){
        setUser(user) 
      }else{
        setUser(null)
      }
  })
  return () => unsubscribe()
  }, [])
  function register(){
    
    console.log('register')
    createUserWithEmailAndPassword(auth,'email@email.com', 'test123')
    .then((user) => {  
      console.log(user)
    }).catch((error) => {
      console.log(error)
    })
  }

  function logIn(){
    loggedin = true
    signInWithEmailAndPassword(auth,'email@email.com', 'test123')
    .then(({ user }) => {
      setUser(user)
    }).catch((error) => {
      // setErrorMessage('Password or email is incorrect')
      console.log(error.message)
    })
  }
  


  function logOut(){
    signOut(auth)
    loggedin= false
    setUser({})
    
  }
  return (
    <div className="App">
      <div className='img__container'>
              <figure className='img__wrapper'>
                <img src='	https://frontendsimplified.com/_nuxt/img/Frontend%20Simplified%20Logo.853fbda.png
        ' ></img>
              </figure>
      </div>
      <div className='btn__container'>
        {
          !loggedin ? (<><button className='btn__login' onClick={logIn}>LogIn</button>
        <button className='btn__register' onClick={register}>Register</button>{" "}</>) : (<>{""}</>)
        
        }
        {loading ? <div className='skeleton'>h</div> : user && user.email ? (<><button onClick={logOut} className='btn__logout'>{user.email[0].toUpperCase()}</button></>) : ""}
      
        </div>

        
      <section>
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPost}>Get All Post</button>
      <button onClick={getPostById}>Get Post By Id</button>
      <button onClick={getPostByUid}>Get Post By Uid</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </section>
    </div>
    
    
  );
}

export default App;
