import logo from './logo.svg';
import './App.css';
import React from 'react'
import { auth }  from './firebase/init'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut , onAuthStateChanged } from "firebase/auth";
let loggedin = false

function App() {
  const [user, setUser] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  
 
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
      
      
    </div>
  );
}

export default App;
