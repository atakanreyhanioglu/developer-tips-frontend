import {Fragment} from "react";
import Link from "next/link";
import Router from "next/router"
import NProgress from 'nprogress'
import {isAuth, logout} from "../helpers/auth.helper";

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()


const Layout = ({children}) => {
    const head = () => (
       <Fragment>
           <link
               href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
               rel="stylesheet"
               integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
               crossOrigin="anonymous"
           />
           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
                 integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
                 crossOrigin="anonymous" referrerPolicy="no-referrer"/>
           <link rel={"stylesheet"} href={"/static/css/styles.css"} />
       </Fragment>
    );
    const nav = () => (
        <ul className="nav nav-tabs ">
            <li className="nav-item">
                <Link href={"/"}>
                    <a className="nav-link text-black">
                        Home
                    </a>
                </Link>
            </li>
            <li className="nav-item">
                <Link href={"/login"}>
                    <a className="nav-link text-black">
                        Login
                    </a>
                </Link>
            </li>
            <li className="nav-item">
                <Link href={"/register"}>
                    <a className="nav-link text-black">
                        Register
                    </a>
                </Link>
            </li>

            {
                isAuth() && isAuth().role === 'admin' && (
                <li className="nav-item ml-auto">
                    <Link href={"/admin"}>
                        <a className="nav-link text-black">
                            Admin
                        </a>
                    </Link>
                </li>
            )}
            {
                isAuth() && isAuth().role === 'subscriber' && (
                    <li className="nav-item ml-auto">
                        <Link href={"/user"}>
                            <a className="nav-link text-black">
                                User
                            </a>
                        </Link>
                    </li>
                )}

            <li className="nav-item">
                <button onClick={logout} className="nav-link text-black">
                   Logout
                </button>
            </li>
        </ul>
    )
    return (
        <Fragment>
            {head()}
            {nav()}
            <div className="container pt-5 pb-5">{children}</div>
        </Fragment>)
}
export default Layout

