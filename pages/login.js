import {useState} from "react";
import Layout from "../components/Layout";
import Router from 'next/router'
import axios from "axios";
import {showSuccessMessage, showErrorMessage} from "../helpers/alerts";
import {API} from "../config"
import {authenticate, isAuth} from "../helpers/auth.helper";

const Login = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
        error: '',
        success: '',
        buttonText: 'Login'
    })


    const {email, password, error, success, buttonText} = state

    const handleChange = (handlerName) => (e) => {
        setState({...state, [handlerName]: e.target.value, error: '', success: '', buttonText: 'Login'})
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setState({...state, buttonText: 'Logging in'})
            const response = await axios.post(`${API}/login`, {
                email, password
            })
            authenticate(response, () => {
                isAuth() && (isAuth().role === 'admin' ? Router.push('/admin') : Router.push('/user'))
            })
        } catch (e) {
            setState({...state, buttonText: 'Register', error: `${e.response.data.error}`})
            console.log(e)
        }

    }


    const loginForm = () => (
        <form onSubmit={handleSubmit}>
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
                <h1>Login</h1>
                <br/>
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                {loginForm()}
            </div>
        </Layout>
    )
}
export default Login
