import {Link} from 'react-router-dom'
import{auth} from '../config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {signOut} from 'firebase/auth'


export const Navbar =() => {
const [user] =useAuthState(auth)

const  usersignOut = async () => {
  await signOut(auth)
}

    return (
    <div className='navbar'>

        <div className='links'>
            <Link to='/'>HOME</Link>

           {!user ? ( <Link to='/login'>LOGIN</Link>) :

            ( <Link to='/createpost'>Create Post</Link>)
           } 
            
       </div>

        <div className='user'>
           <p>{user?.displayName}</p> 
           <img src={user?.photoURL || " "} height='20' width='20'  alt=''/>
           <button onClick={usersignOut}>logout</button>    
        </div>

    </div>
    )
}