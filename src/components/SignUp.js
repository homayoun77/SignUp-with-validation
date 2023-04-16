import styles from './signup.module.css'
import React, { useEffect, useState } from 'react'

import { validate } from './validate'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { notify } from './toast';
import { Link } from 'react-router-dom';

function SignUp() {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        isAccepted: false
    })

    const [error, setError] = useState({})
    const [touched, setTouched] = useState({})

    useEffect(() => {
        setError(validate(data , 'signup'))
    }, [data])

    const changeHandler = (event) => {
        if (event.target.name === 'isAccepted') {
            setData({ ...data, [event.target.name]: event.target.checked })
        } else {
            setData({ ...data, [event.target.name]: event.target.value })
        }
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
                name: true,
                email: true,
                password: true,
                confirmPassword: true,
                isAccepted: true
            })
        }
    }



    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2 className={styles.header}>SignUp</h2>
                <div className={styles.formField}>
                    <label>Name</label>
                    <input
                        className={(error.name && touched.name) ? styles.uncompleted : styles.formInput}
                        type="text"
                        name='name'
                        value={data.name}
                        onChange={changeHandler}
                        onFocus={focusHandler} />
                    {error.name && touched.name && <span>{error.name}</span>}
                </div>
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
                <div className={styles.formField}>
                    <label>Confirm Password</label>
                    <input
                        className={(error.confirmPassword && touched.confirmPassword) ? styles.uncompleted : styles.formInput}
                        type="password"
                        name='confirmPassword'
                        value={data.confirmPassword}
                        onChange={changeHandler}
                        onFocus={focusHandler} />
                    {error.confirmPassword && touched.confirmPassword && <span>{error.confirmPassword}</span>}
                </div>
                <div className={styles.formField}>
                    <div className={styles.checkBoxContainer}>
                        <label>I accept Terms of Privacy Policy </label>
                        <input
                            type="checkbox"
                            name='isAccepted'
                            value={data.isAccepted}
                            onChange={changeHandler}
                            onFocus={focusHandler} />
                    </div>
                    {error.isAccepted && touched.isAccepted && <span>{error.isAccepted}</span>}
                </div>
                <div className={styles.formButtons}>
                    <Link to='/login'>Login</Link>
                    <button type='submit'>Sign Up</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default SignUp