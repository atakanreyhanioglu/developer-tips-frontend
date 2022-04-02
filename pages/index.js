import Layout from "../components/Layout";
import axios from "axios";
import {API} from "../config";
import {useEffect, useState} from "react";
import Link from "next/link";
import styles from '../styles/Home.module.css'


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
    const render = (data) => {
        return (
            <div className={"content d-flex justify-content-center align-items-center flex-column"}>
                <h1 className={"mb-4"}>Developer Tips</h1>
                {data.map((d, idx) => {
                    return (
                        <div key={idx} className="card border border-grey shadow-0 m-2">
                            <Link href={`/tip/${d._id}`}>
                                <div className={styles.card}>
                                    <div className={"p-4"}>
                                        <h2 className="card-title mb-4">{d.title}</h2>
                                        <p className="card-text">
                                            {d.content}
                                        </p>
                                    </div>
                                    <div className={"p-4"}>
                                        {d.tags.map((t, idt) => (
                                                <div key={idt}>
                                                    {t}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </Link>
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

