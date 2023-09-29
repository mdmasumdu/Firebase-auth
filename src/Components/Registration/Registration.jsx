import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import auth from "../../Firebase.config";


const Registration = () => {

    const [succes,setSucces] =useState('');
    const [errora,setErrora] = useState('')
 


    const regHandler =e=>{
        e.preventDefault()
        const email = e.target.email.value;
        const password= e.target.password.value;

        setErrora('')
        setSucces('')

        console.log(email,password)
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
            
            console.log(result)
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
                <input type="password" name="password" id="" placeholder="Password" className="my-5 p-2 md:w-96" required />
                <br />
                <input type="submit" value="Submit"  className=" btn btn-secondary p-2 md:w-96"/>


            </form>
            </div>
            
        </div>
    );
};

export default Registration;