import styles from './SignIn.module.css';
import GoogleIcon from '../../assets/google-social-icon.svg'
import todoLogo from '../../assets/todo-logo.svg';
import { db } from 'src/config/firebase';
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { auth } from 'src/config/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';


export function SignIn(){
  const [user, setUser] = useState<User>({} as User)
  const navigate = useNavigate()

  async function handleGoogleSignIn(){
    try{
      const provider = new GoogleAuthProvider()

      const result = await signInWithPopup(auth, provider);
      const { email, displayName } = result.user;

      const usersRef = collection(db, 'users');
      const queryRef = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(queryRef);

      if (!querySnapshot.empty) {
        return navigate('/todos')
      }

      await addDoc(collection(db, 'users'), {
        email: email,
        name: displayName
      })

      return navigate('/todos')
    }catch(error){
      console.error(error)
    }
  }

  return(
    <div className={styles.signInContainer}>
      <img src={todoLogo} alt='App ToDo logo, it is a rocket followed by todo' />
      <h1>Welcome to your <span>ToDo's</span></h1>
      <button onClick={handleGoogleSignIn} className={styles.googleAuth}> <img src={GoogleIcon} alt='Google logo' />Sign In with Google</button>
    </div>
  )
}