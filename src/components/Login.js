import styles from './signup.module.css'
import React, { useEffect, useState } from 'react'

import { validate } from './validate'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { notify } from './toast';
import { Link } from 'react-router-dom';

function Login() {

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState({})
    const [touched, setTouched] = useState({})

    useEffect(() => {
        setError(validate(data , 'login'))
    }, [data])

    const changeHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const focusHandler = (event) => {
        setTouched({ ...touched, [event.target.name]: true })
    }

    const submitHandler = (event) => {
        event.preventDefault()
        if (!Object.keys(error).length) {
            notify('You signed in successfully', 'success')
        } else {
            notify('Invalid data!', 'error')
            setTouched({
                email: true,
                password: true
            })
        }
    }



    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2 className={styles.header}>Login</h2>
                <div className={styles.formField}>
                    <label>Email</label>
                    <input
                        className={(error.email && touched.email) ? styles.uncompleted : styles.formInput}
                        type="text"
                        name='email'
                        value={data.email}
                        onChange={changeHandler}
                        onFocus={focusHandler} />
                    {error.email && touched.email && <span>{error.email}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Password</label>
                    <input
                        className={(error.password && touched.password) ? styles.uncompleted : styles.formInput}
                        type="password"
                        name='password'
                        value={data.password}
                        onChange={changeHandler}
                        onFocus={focusHandler} />
                    {error.password && touched.password && <span>{error.password}</span>}
                </div>
                <div className={styles.formButtons}>
                    <Link to='/signup'>Sign Up</Link>
                    <button type='submit'>Login</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login