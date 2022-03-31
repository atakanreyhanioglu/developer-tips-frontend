import {useState, useEffect} from "react";
import jwt from 'jsonwebtoken'
import axios from "axios";
import {showErrorMessage, showSuccessMessage} from "../../../helpers/alerts";
import {API} from "../../../config";
import Layout from '../../../components/Layout'

import {withRouter} from "next/router";

const ActivateAccount = ({router}) => {
    const [state, setState] = useState({
        name: '',
        token: ``,
        buttonText: 'Activate Account',
        success: '',
        error: '',
        disableButton: false
    })
    const {name, token, buttonText, success, error, disableButton} = state

    useEffect(() => {
        const newToken = document.URL.split('activate/')[1]
        if(newToken) {
            const {name} = jwt.decode(newToken, {})
            setState({...state, name, token: newToken})
        }
    }, [name])
    const clickSubmit = async e => {
        e.preventDefault()
        setState({...state, buttonText: 'Activating'})
        try {
            const response = await axios.post(`${API}/register/activate`, {token})
            console.log('account activate response', response)
            setState({...state,name: '', token: '', buttonText: 'Activated', success: response.data.message})
        }catch (e) {
            console.log(e.response.data.error)
            setState({...state,name: '', token: '',disableButton: true , buttonText: 'Activate Account', error: e.response.data.error})
        }
    }

    return <Layout>
        <div className="row d-flex">
            <div className="d-flex flex-column align-items-center justify-content-center">
                <h2>
                    Hi {name}! Ready to <b>activate</b> your account?
                </h2>
                <br/>
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                <button className="btn btn-primary" type={"button"} onClick={clickSubmit} disabled={disableButton ? disableButton : false}>{buttonText}</button>
            </div>
        </div>
    </Layout>
}

export default withRouter(ActivateAccount)
