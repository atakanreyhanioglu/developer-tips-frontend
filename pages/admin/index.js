
import Layout from "../../components/Layout";
import {useState} from "react";
import axios from "axios";
import {API} from "../../config";
import {getCookie} from "../../helpers/auth.helper";
import {showErrorMessage, showSuccessMessage} from "../../helpers/alerts";

const Admin = () => {
    const [state, setState] = useState({
        tags: [],
        title: '',
        content: '',
        error: '',
        success: '',
    });
    const {error, content, tags, title, success} = state

    const handleChange = (handlerName) => (e) => {
        setState({...state, [handlerName]: e.target.value, error: '', buttonText: 'Add a tip', success: '' })
    }
    const handleChangeCheckBox = (checkBoxName) => (e) => {
        if(e.target.checked && !tags.includes(checkBoxName)) {
            tags.push(checkBoxName)
        }
        if(!e.target.checked && tags.includes(checkBoxName)) {
            const isTheElement = (element) => element === checkBoxName;
            let index = tags.findIndex(isTheElement)
            tags.splice(index, 1);
        }
        setState({...state, tags, error: '', success: ''})
        e.preventDefault()
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post(`${API}/tips`, {
                tags, title, content
            }, {
                headers: {
                    'Authorization': `Bearer ${getCookie('token')}`
                }
            })
            setState({
                tags: [],
                content: '',
                title: '',
                error: ``,
                success: `${response.data.status}`
            })
            const checkBoxes = document.getElementsByClassName('checkbox')
            for (let box of checkBoxes) {
                box.checked = false
            }
            }catch (err) {
            console.log(err)
            setState({...state, error: `${err.response.data.error}`})
        }
    }

    const createForm = () => (
        <form onSubmit={handleSubmit}>
            <h3>Tags</h3>
            <div className={"check-boxes justify-content-space-between align-items-flex-start flex-column flex-wrap"}>
                <div className={"nodejs-checkbox"}>
                    <input onChange={handleChangeCheckBox('nodejs')} className="checkbox form-check-nodejs" type="checkbox"
                           id="form-check-nodejs"/>
                    <label className="form-check-nodejs" htmlFor="nodejs">
                        Node.js
                    </label>
                </div>
                <div className={"typescript-checkbox"}>
                    <input onChange={handleChangeCheckBox('typescript')} className="checkbox form-check-typescript" type="checkbox" value="typescript"
                           id="typescript"/>
                    <label className="form-check-typescript" htmlFor="typescript">
                        Typescript
                    </label>
                </div>
                <div className={"NoSql-checkbox"}>
                    <input onChange={handleChangeCheckBox('nosql')} className="checkbox form-check-NoSql" type="checkbox" value="nosql" id="NoSql"/>
                    <label className="form-check-NoSql" htmlFor="NoSql">
                        NoSql
                    </label>
                </div>
                <div className={"Sql-checkbox"}>
                    <input onChange={handleChangeCheckBox('sql')} className="checkbox form-check-Sql" type="checkbox" value="sql" id="Sql"/>
                    <label className="form-check-Sql" htmlFor="Sql">
                        Sql
                    </label>
                </div>
                <div className={"Javascript-checkbox"}>
                    <input onChange={handleChangeCheckBox('javascript')} className="checkbox form-check-Javascript" type="checkbox" value="javascript"
                           id="javascript"/>
                    <label className="form-check-Javascript" htmlFor="Javascript">
                        Javascript
                    </label>
                </div>
                <div className={"HTML5-checkbox"}>
                    <input onChange={handleChangeCheckBox('html')} className="checkbox form-check-HTML5" type="checkbox" value="html5" id="html5"/>
                    <label className="form-check-HTML5" htmlFor="HTML5">
                        HTML5
                    </label>
                </div>
                <div className={"CSS3-checkbox"}>
                    <input onChange={handleChangeCheckBox('css')} className="checkbox form-check-CSS3" type="checkbox" value="css3" id="css3"/>
                    <label className="form-check-CSS3" htmlFor="CSS3">
                        CSS3
                    </label>
                </div>
            </div>
            <br/>
            <h3>Title</h3>
            <input type="text" onChange={handleChange('title')} className="form-control" id="title" placeholder="Title" value={title} />
            <br/>
            <h3>Content</h3>
            <textarea onChange={handleChange('content')} className="form-control" id="content-text-area" rows="3" value={content}/>
            <br/>
            <button type={"submit"} className={"btn btn-info"}>Add a tip</button>
        </form>
    )

    const render = () => (
        <div className={"d-flex m-auto w-50 justify-content-center align-items-flex-start flex-column"}>
            {error && showErrorMessage(error)}
            {success && showSuccessMessage(success)}
            {createForm()}
        </div>
    )

    return <Layout>{render()}</Layout>

}

export default Admin
