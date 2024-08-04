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
    onAuthStateChanged(auth, (user) => {
      setLoading(false)
      loggedin = true

      if(user){
        setUser(user) 
      } 
  })
  }, [])
  function register(){
    loggedin = true
    console.log('register')
    createUserWithEmailAndPassword(auth,'email@email.com', 'test123')
    .then((user) => {  
      console.log(user)
    }).catch((error) => {
      console.log(error)
    })
  }

  function logIn(){
    
    signInWithEmailAndPassword(auth,'email@email.com', 'test123')
    .then(({ user }) => {  
      console.log(user.email[0].toUpperCase())
      loggedin = true
      setUser(user)
    }).catch((error) => {
      // setErrorMessage('Password or email is incorrect')
      console.log(error.message)
    })
  }
  


  function logOut(){
    signOut(auth)
    loggedin = false
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
          !loggedin ? (<><button onClick={register}>Register</button>
        <button onClick={logIn}>LogIn</button>{" "}</>) : (<button onClick={logOut}>LogOut</button>)
        
        }
        {loading ? "loading.." : user.email[0].toUpperCase()}
      
        </div>
      
      
    </div>
  );
}

export default App;
