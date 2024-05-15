import {getDocs , collection} from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { db } from '../config/firebase'
import{Postt} from './post'

 export interface Posters {
    id : string,
    descrpition:string;
    title :string;
    username :string;
    userId : string

}





export const Main =()=>{

    const postref = collection(db, 'post' )
    const [postList ,setpostList] = useState <Posters []| null > (null)
    

    const getPost = async () => {
     const data = await  getDocs(postref)
     setpostList(data.docs.map((doc) => ({...doc.data(),id:doc.id})) as Posters[]) 
     
     }
    useEffect(()=> {
        getPost()
    } ,[])

    return <div>{postList?.map((important) => <Postt importantt={important}/>) }</div>
}


