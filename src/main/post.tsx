

import { addDoc, collection, getDoc, getDocs, query, where ,deleteDoc,doc} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, db } from '../config/firebase'
import {Posters} from './main'

interface propss {
    importantt: Posters
}
interface Like {
    userId : string
}




export  const Postt = (props :propss) => {
    const {importantt} = props
    const [user] =useAuthState(auth)

    const [likes , setLikes] = useState <Like [] | null> (null)

    const likeRef = collection(db, 'likes')

    const getLikes = async () => {
        const likesQuery = query(likeRef, where("postId", "==", importantt.id))
        const data = await getDocs(likesQuery)
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })))
    }

const addLike = async () => {
    try {
    if (user){
        await addDoc(likeRef , {userId :user?.uid , postId : importantt.id})
        setLikes((prev) => prev ? [...prev,{userId:user?.uid}] : [{userId:user?.uid}]
    )
    }
} catch (err) {
    console.log(err)
}
}
const removeLike = async () => {
    try {
        if (user) {
            const likeToDeleteQuery = query(
                likeRef,
                where('postId', '==', importantt.id),
                where('userId', '==', user.uid)
            )

            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            if (!likeToDeleteData.empty) {
                const likeToDelete = doc(db, 'likes', likeToDeleteData.docs[0].id)
                await deleteDoc(likeToDelete)
                setLikes((prev) => prev ? prev.filter((like) => like.userId !== user.uid) : null)
            }
           } 
        }catch (err) {
    console.log(err)
            }
            }

            const userHasLiked = likes?.some((like) => like.userId === user?.uid)

useEffect(() => {
 getLikes() ;
} ,[importantt.id])


return <div>
        <div className='title'><h1>{importantt.title}</h1></div>
        <div className='body'> <p>{importantt.descrpition}</p></div>
        <div className='footer'><p>@{importantt.username}</p></div>
        <button onClick={userHasLiked ? removeLike : addLike}>
                {userHasLiked ? <>&#128078;</> : <>&#128077;</>}
        </button>
        {likes && <p>likes: {likes?.length}</p>}
    </div>
}