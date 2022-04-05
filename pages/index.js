import Layout from "../components/Layout";
import axios from "axios";
import {API} from "../config";
import {useEffect, useState} from "react";
import Link from "next/link";
import styles from '../styles/Home.module.css'
import {getCookie, isAuth} from "../helpers/auth.helper";


const Home = () => {
    const [state, setState] = useState({
        tips: [],
        status: ''
    });
    const {status, tips} = state
    useEffect(async () => {
        await getTips()
    }, []);
    const getTips = async () => {
        const response = await axios.get(`${API}/tips`)
        setState({...state, tips: response.data.data, status: response.data.status})
    }
    const deleteTip = async (id) => {
        try {
            const response = await axios.delete(`${API}/tips/${id}`, {
                headers: {
                    'Authorization': `Bearer ${getCookie('token')}`
                }
            })
            tips.forEach((t, i )=> {
                if(t._id === id) {
                    tips.splice(i, 1)
                }
            })
            setState({...state, tips})
        }catch (e) {
            console.log(e)
        }
    }

    const render = (data) => {
        return (
            <div className={"content d-flex justify-content-center align-items-center flex-column"}>
                <h1 className={"mb-4"}>Developer Tips</h1>
                {data.map((d, idx) => {
                    return (
                        <div key={idx} className="w-100 card border border-grey shadow-0 m-2 mw-80">
                                <div className={styles.card}>
                                    <Link href={`/tip/${d._id}`}>
                                    <div className={"p-4 w-100 h-100"}>
                                        <h2 className="card-title mb-4">{d.title}</h2>
                                        <p className="card-text">
                                            {d.content}
                                        </p>
                                    </div>
                                    </Link>
                                    <div className={"p-4 d-flex flex-column"}>
                                        {d.tags.map((t, idt) => (
                                                <div key={idt}>
                                                    {t}
                                                </div>
                                            )
                                        )}
                                        {
                                            isAuth() && isAuth().role === 'admin' && (
                                                <button onClick={() => deleteTip(d._id)} className={"delete btn btn-outline-dark mt-5"}>Delete</button>
                                            )
                                        }
                                    </div>
                                </div>
                        </div>
                    )
                })}
            </div>
        );
    }
    return (
        <Layout>{render(tips)}</Layout>
    )
}

export default Home

