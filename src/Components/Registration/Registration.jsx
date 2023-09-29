import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useState } from "react";
import auth from "../../Firebase.config";
import { FaEye,FaEyeSlash} from 'react-icons/fa';


const Registration = () => {

    const [succes,setSucces] =useState('');
    const [errora,setErrora] = useState('')
    const [show,setShow] = useState(false)
 


    const regHandler =e=>{
        e.preventDefault()
        const email = e.target.email.value;
        const password= e.target.password.value;
        const name= e.target.text.value;

        setErrora('')
        setSucces('')

        console.log(email,password,name)
        if(password.length<6){
            setErrora('Password should at least 6 character')
            return;
        }
        else if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)){
            setErrora("Provide your email correctly")
            return;
        }

        else if(!/[A-Z]/.test(password)){
            setErrora('Your password must be At least 8 characters long Contains at least one uppercase letter  Contains at least one lowercase letter  Contains at least one  Contains at least one special character from the following: @#$%^&+=!')

            return;
        }

        createUserWithEmailAndPassword(auth,email,password)
        .then(result=>{
            

            // update profile
            updateProfile(result.user,{
                displayName:name,
                photoURL: "https://example.com/jane-q-user/profile.jpg"
            })

            // send email verification
            sendEmailVerification(result.user)
            .then(()=> alert('Email verification sent'))
            .catch((error)=> console.log(error))
            
            setSucces('Succsefully registered')
        })
        .catch(error=>{
            setErrora(error.message)
        })
        


    }
    return (
        <div>

             <h1 className="text-2xl font-bold text-center">Register Here</h1>

             <div className="flex justify-center mt-6">
                {
                    errora ? <p className="text-red-700">{errora}</p> : ''
                }

                {
                    succes ? <p className="text-green-700">{succes}</p> :''
                    
                }
             </div>
            <div className="flex justify-center mt-10">
            <form onSubmit={regHandler}>
                <input type="email" name="email" id="" placeholder="Your Email" className=" p-2 md:w-96" required />
                <br />
                <input type="text" name="text" id="" placeholder="Your Name" className=" p-2 md:w-96 mt-5" required />
                <br />
                <div>
                <input type={show ? "password": 'text'} name="password" id="" placeholder="Password" className="my-5 p-2 md:w-96 relative" required />
                <span className="absolute mt-8 -ml-6" onClick={()=>setShow(!show)}> {show ?<FaEye></FaEye>:<FaEyeSlash></FaEyeSlash> }</span>
                </div>
                <br />
                <input type="submit" value="Submit"  className=" btn btn-secondary p-2 md:w-96"/>


            </form>
            </div>
            
        </div>
    );
};

export default Registration;