import React, { useState } from 'react';
import './ForgotPsw.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPsw = () => {
    const[email, setEmail] = useState();
    const[password, setPassword] = useState();
    const[rePassword, setRePassword] = useState();

    const navigate = useNavigate();

    const accept = (e) => {
        e.preventDefault();

        if(!password || !email) {
            alert('Заполните необходимые поля*');
        }
        else if (password !== rePassword) {
            alert('Пароли не совпадают');
        }
        else {
            axios.post('/forgot-psw', {
                email,
                password
            })
            .then(response => {
                response.data.message !== undefined && alert(response.data.message);
            })
            .catch(err => {
                console.log(err);
            });
            navigate('/');
        }
    }

    return (
        <div id='forgotPsw'>
            <div className="wrap">
                <form className='login'>
                    <div><input type="email" placeholder='Введите вашу почту' onChange={(e) => {setEmail(e.target.value)}} /></div>
                    <div><input type="text" placeholder='Введите новый пароль' onChange={(e) => {setPassword(e.target.value)}} /></div>
                    <div><input type="text" placeholder='Повторите пароль' onChange={(e) => {setRePassword(e.target.value)}} /></div>
                    <button onClick={accept}>Подтвердить</button>
                    <Link to='/'><span>вход</span></Link>
                </form>
            </div>
        </div>
    );
};

export default ForgotPsw;