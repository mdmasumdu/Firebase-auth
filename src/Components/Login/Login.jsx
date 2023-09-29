import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import auth from "../../Firebase.config";
import { Link } from "react-router-dom";

const Login = () => {

  const [succes,setSucces] =useState('');
  const [errora,setErrora] = useState('')


const emailref = useRef()
  // forgot password email sent
  const forgothandle =()=>{

    setErrora('')
    const email =emailref.current.value;
    if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)){
      setErrora('provide your email correctly')
    }
    sendPasswordResetEmail(auth,email)
    .then(()=>{
      setSucces('')
      setSucces("An password reset email has been sent")
    })
    .catch((error)=>{console.log(error)})




  }

  const loginhandler =(e)=>{
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;
  

    setErrora('')
    setSucces('')

    if(password.length<6){
      setErrora('Password should at least 6 character')
      return;
  }
  else if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)){
      setErrora("Provide your email correctly")
      return;
  }

  else if(!/[A-Z]/.test(password)){
      setErrora('Your password must Contains at least one uppercase letter')

      return;
  }


    signInWithEmailAndPassword(auth,email,password)
    .then(result=>{
      if(result.user.emailVerified){
        console.log(result.user)
        setSucces('succesfully signed in')
      }
      else{
        setErrora('Please verify your email')
      }
      
    })
    .catch(error=> setErrora(error.message))

  }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
      {
                    errora ? <p className="text-red-700">{errora}</p> : ''
                }

                {
                    succes ? <p className="text-green-700">{succes}</p> :''
                    
                }
        <form onSubmit={loginhandler}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" ref={emailref} name="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" name="password" className="input input-bordered" />
          <label className="label">
            <Link onClick={forgothandle}>Forgot password?</Link>
          </label>
        </div>
       <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;