import {useForm} from "react-hook-form"
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {addDoc,collection} from 'firebase/firestore'
import { auth, db } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import {useNavigate} from 'react-router-dom'



export const Createform =()  => {

    interface CreateForm {
        title : string;
        descrpition : string
    }
    const navigate = useNavigate()

    const [user] =useAuthState(auth)

    const schema = yup.object().shape({
        title : yup.string().required("You Must Add a Title"),
        descrpition : yup.string().required("You Must Add a Description")
    })

     const {register , handleSubmit ,formState : {errors}} =useForm <CreateForm>({
        resolver :yupResolver(schema)
     })
     
const postref = collection(db, 'post' )

     const onCreatepost = async(data : CreateForm) => {
       await addDoc(postref,{
        title : data.title,
        descrpition: data.descrpition,
        username: user?.displayName,
        userId: user?.uid,    

       })

       navigate('/')
       
        
     }
   
    return (
     <form onSubmit={handleSubmit(onCreatepost)}>
         <input placeholder="Title.." {...register('title')}/>
         <p style={{color:'red'}}>{errors.title?.message}</p>
         <textarea  placeholder="Description"{...register('descrpition')}/>
         <p style={{color:'red'}}>{errors.descrpition?.message}</p>
         <input  className="submitForm" type='submit'/>
    </form>
  )
}
