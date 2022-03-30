import {useState} from "react";
import Layout from "../components/Layout";
import axios from "axios";

const Register = () => {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: '',
        buttonText: 'Register'
    })

    const {name, email, password, error, success, buttonText} = state

    const handleChange = (handlerName) => (e) => {
        setState({...state, [handlerName]: e.target.value, error: '', success: '', buttonText: 'Register'})

    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post('http://localhost:8080/api/register', {
                name, email, password
            })
        } catch (e) {
            console.log(e)
        }

    }


    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
                <input value={name} onChange={handleChange('name')} type="text" className="form-control" placeholder={"Type your name"}/>
            </div>
             <div className="form-group mb-4">
                <input value={email} onChange={handleChange('email')} type="email" className="form-control" placeholder={"Type your email"}/>
            </div>
             <div className="form-group mb-4">
                <input value={password} onChange={handleChange('password')} type="password" className="form-control" placeholder={"Type your password"}/>
            </div>
             <div className="form-group">
                 <button type="submit" className="btn btn-info">{buttonText}</button>
             </div>
        </form>
    )
    return (
        <Layout>
          <div className={"col-md-6 offset-md-3"}>
            <h1>Register</h1>
            <br/>
            {registerForm()}
              <br/>
              {JSON.stringify(state)}
          </div>
         </Layout>
    )
}
export default Register
