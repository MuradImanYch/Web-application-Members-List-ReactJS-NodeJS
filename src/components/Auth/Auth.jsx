import React, { useState, useEffect } from 'react';
import './Auth.css';
import $ from 'jquery';
import axios from 'axios';
import cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

const Auth = () => {
    const[username, setUsername] = useState();
    const[password, setPassword] = useState();
    const[rePassword, setRePassword] = useState();
    const[name, setName] = useState();
    const[lName, setLName] = useState();
    const[fName, setFName] = useState();
    const[jobTitle, setJobTitle] = useState();
    const[department, setDepartment] = useState();
    const[email, setEmail] = useState();
    const[phone, setPhone] = useState();
    const[wPhone, setWPhone] = useState();
    const[bDate, setBDate] = useState();
    const[token, setToken] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if(token) {
            cookies.set('auth', token, {expires: 30});
            navigate('/search');
        }
    }, [token]);

    const showLog = () => {
        $('.login').hide();
        $('.reg').show();
        setUsername();
        setPassword();
        setName();
        setLName();
        setFName();
        setJobTitle();
        setDepartment();
        setEmail();
        setWPhone();
        setPhone();
        setBDate();
        $('input').val('');
    }

    const showReg = () => {
        $('.login').show();
        $('.reg').hide();
        setUsername();
        setPassword();
        setName();
        setLName();
        setFName();
        setJobTitle();
        setDepartment();
        setEmail();
        setWPhone();
        setPhone();
        setBDate();
        $('input').val('');
    }

    const login = (e) => {
        e.preventDefault();

        if(!username || !password) {
            alert('Заполните необходимые поля*');
        }
        else {
            axios.post('/auth/login', {
                username,
                password
            })
            .then(response => {
                response.data.message !== undefined && alert(response.data.message);
                setToken(response.data.token);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    const registration = (e) => {
        e.preventDefault();

        if(!username || !password || !name || !lName || !fName || !jobTitle || !department || !email) {
            alert('Заполните необходимые поля*');
        }
        else if (password !== rePassword) {
            alert('Пароли не совпадают');
        }
        else {
            axios.post('/auth/registration', {
                username,
                password,
                name,
                lName,
                fName,
                jobTitle,
                department,
                email,
                wPhone,
                phone,
                bDate
            })
            .then(response => {
                response.data.message !== undefined && alert(response.data.message);
                setToken(response.data.token);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
    
    return (
        <div id='auth'>
            <div className="wrap">
                <form className='login'>
                    <div><input type="text" placeholder='Логин' onChange={(e) => {setUsername(e.target.value)}} /></div>
                    <div><input type="password" placeholder='Пароль' onChange={(e) => {setPassword(e.target.value)}} /></div>
                    <button onClick={login}>Войти</button>
                    <span onClick={showLog}>регистрация</span>
                    <Link to='/forgot-password'><span>забыли пароль</span></Link>
                </form>

                <form className='reg'>
                    <div><input required type="text" placeholder='Логин*' onChange={(e) => {setUsername(e.target.value)}} /></div>
                    <div><input required type="text" placeholder='Пароль*' onChange={(e) => {setPassword(e.target.value)}} /></div>
                    <div><input required type="text" placeholder='Повторите пароль*' onChange={(e) => {setRePassword(e.target.value)}} /></div>
                    <div><input required type="text" placeholder='Имя*' onChange={(e) => {setName(e.target.value)}} /></div>
                    <div><input required type="text" placeholder='Фамилия*' onChange={(e) => {setLName(e.target.value)}} /></div>
                    <div><input required type="text" placeholder='Отчество*' onChange={(e) => {setFName(e.target.value)}} /></div>
                    <div><input required type="text" placeholder='Должность*' onChange={(e) => {setJobTitle(e.target.value)}} /></div>
                    <div><input required type="text" placeholder='Отдел*' onChange={(e) => {setDepartment(e.target.value)}} /></div>
                    <div><input required type="email" placeholder='Почта*' onChange={(e) => {setEmail(e.target.value)}} /></div>
                    <div><input required type="number" placeholder='Рабочий телефон*' onChange={(e) => {setWPhone(e.target.value)}} /></div>
                    <div><input type="number" placeholder='Мобильный телефон' onChange={(e) => {setPhone(e.target.value)}} /></div>
                    <div><input type="date" placeholder='Дата рождения: ДД.ММ.ГГ' onChange={(e) => {setBDate(e.target.value)}} /></div>
                    <button onClick={registration}>Зарегистрироватся</button>
                    <span onClick={showReg}>вход</span>
                </form>
            </div>
        </div>
    );
};

export default Auth;