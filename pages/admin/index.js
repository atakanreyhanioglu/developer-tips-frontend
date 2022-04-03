
import Layout from "../../components/Layout";
import {useState} from "react";

const Admin = () => {
    const [state, setState] = useState({
        tips: [],
        status: ''
    });
    const {status, tips} = state

    const render = () => (
        <div className={"d-flex justify-content-center align-items-flex-start flex-column"}>
            <h3>Tags</h3>
            <div className={"check-boxes justify-content-space-between align-items-flex-start flex-column"}>
                <div className={"checkboxes justify-content-center align-items-space-center flex-row"}>
                    <div className={"nodejs-checkbox"}>
                        <input className="form-check-nodejs" type="checkbox" value="nodejs" id="form-check-nodejs" />
                        <label className="form-check-nodejs" htmlFor="nodejs">
                            Node.js
                        </label>
                    </div>
                    <div className={"typescript-checkbox"}>
                        <input className="form-check-typescript" type="checkbox" value="typescript" id="typescript" />
                        <label className="form-check-typescript" htmlFor="typescript">
                            Typescript
                        </label>
                    </div>
                    <div className={"NoSql-checkbox"}>
                        <input className="form-check-NoSql" type="checkbox" value="nosql" id="NoSql" />
                        <label className="form-check-NoSql" htmlFor="NoSql">
                            NoSql
                        </label>
                    </div>
                    <div className={"Sql-checkbox"}>
                        <input className="form-check-Sql" type="checkbox" value="sql" id="Sql" />
                        <label className="form-check-Sql" htmlFor="Sql">
                            Sql
                        </label>
                    </div>
                </div>
            </div>
            <br/>
            <h3>Title</h3>
            <input type="email" className="form-control" id="title" placeholder="Title" />
            <br/>
            <h3>Content</h3>
            <textarea className="form-control" id="content-text-area" rows="3"/>
        </div>
    )

    return <Layout>{render()}</Layout>

}

export default Admin
