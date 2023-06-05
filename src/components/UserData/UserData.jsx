import React, { useEffect, useState } from 'react';
import './UserData.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import cookies from 'js-cookie';

const UserData = () => {
    const {id} = useParams();
    const[selected, setSelected] = useState();
    const[isAdmin, setIsAdmin] = useState();
    const[edit, setEdit] = useState(false);

    const[nName, setNName] = useState();
    const[nLName, setNLName] = useState();
    const[nFName, setNFName] = useState();
    const[nImg, setNImg] = useState();
    const[nJobTitle, setNJobTitle] = useState();
    const[nDepartment, setNDepartment] = useState();
    const[nWPhone, setNWPhone] = useState();
    const[nPhone, setNPhone] = useState();
    const[nEmail, setNEmail] = useState();
    const[nBDate, setNBDate] = useState();

    useEffect(() => {
        axios.post('/get-user-data', {
            id
        })
        .then(response => {
            setSelected(response.data);
        })
        .catch(err => {
            console.log(err);
        });

        cookies.get('auth') && axios.post('/user-data', {
            token: cookies.get('auth')
        })
        .then(response => {
            setIsAdmin(response.data[0].role);
        })
        .catch(err => {
            console.log(err);
        });
    }, [id]);

    const editFunc = () => {
        setEdit(true)
    }

    const saveFunc = () => {
        setEdit(false);

        axios.post('/user-data/save-admin-changed-data', {
            id: selected && selected[0].id,
            name: nName ? nName : selected && selected[0].name,
            lName: nLName ? nLName : selected && selected[0].lname,
            fName: nFName ? nFName : selected && selected[0].fName,
            jobTitle: nJobTitle ? nJobTitle : selected && selected[0].jobTitle,
            department: nDepartment ? nDepartment : selected && selected[0].department,
            wPhone: nWPhone ? nWPhone : selected && selected[0].wPhone,
            phone: nPhone ? nPhone : selected && selected[0].phone,
            email: nEmail ? nEmail : selected && selected[0].email,
            img: nImg ? nImg : selected && selected[0].img,
            bDate: nBDate ? nBDate : selected && selected[0].bDate
        })
        .catch(err => {
            console.log(err);
        });
    }

    const deleteAcc = () => {
        isAdmin && axios.post('/user-data/delete', {
            id: selected && selected[0].id
        })
        .catch(err => {
            console.log(err);
        });

        window.location.reload();
    }

    const setAdm = () => {
        axios.post('/set-role/admin', {
            id: selected && selected[0].id
        })
        .catch(err => {
            console.log(err);
        });

        window.location.reload();
    }

    const removeAdm = () => {
        axios.post('/set-role/removeAdm', {
            id: selected && selected[0].id
        })
        .catch(err => {
            console.log(err);
        });

        window.location.reload();
    }

    const selectImg = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        const {data} = await axios.post('/upload', formData);
        
        setNImg(data.url);
    }

    return (
        <div id='user-data'>
            <div className="img">
                <img src={nImg ? nImg : selected && selected[0].img} alt="ava" />
            </div>
            {edit && <input type="file" onChange={selectImg} />}
            <div>
                <span className='label'>Имя пользователя: </span>
                <input type="text" value={selected && selected[0].username} disabled style={{textDecoration: 'underline', textUnderlineOffset: '3px'}} />
            </div>
            <div>
                <span className='label'>Имя: </span>
                {!edit ? <input disabled type="text" value={nName ? nName : selected && selected[0].name} /> : <input className='edit' type="text" onChange={(e) => {setNName(e.target.value)}} />}
            </div>
            <div>
                <span className='label'>Фамилия: </span>
                {!edit ? <input disabled type="text" value={nLName ? nLName : selected && selected[0].lname} /> : <input className='edit' type="text" onChange={(e) => {setNLName(e.target.value)}} />}
            </div>
            <div>
                <span className='label'>Отчество: </span>
                {!edit ? <input disabled type="text" value={nFName ? nFName : selected && selected[0].fName} /> : <input className='edit' type="text" onChange={(e) => {setNFName(e.target.value)}} />}
            </div>
            <div>
                <span className='label'>Должность: </span>
                {!edit ? <input disabled type="text" value={nJobTitle ? nJobTitle : selected && selected[0].jobTitle} /> : <input className='edit' type="text" onChange={(e) => {setNJobTitle(e.target.value)}} />}
            </div>
            <div>
                <span className='label'>Отдел: </span>
                {!edit ? <input disabled type="text" value={nDepartment ? nDepartment : selected && selected[0].department} /> : <input className='edit' type="text" onChange={(e) => {setNDepartment(e.target.value)}} />}
            </div>
            <div>
                <span className='label'>Рабочий номер тел.: </span>
                {!edit ? <input disabled type="number" value={nWPhone ? nWPhone : selected && selected[0].wPhone} /> : <input className='edit' type="number" onChange={(e) => {setNWPhone(e.target.value)}} />}
            </div>
            <div>
                <span className='label'>Номер тел.: </span>
                {!edit ? <input disabled type="number" value={nPhone ? nPhone : selected && selected[0].phone} /> : <input className='edit' type="number" onChange={(e) => {setNPhone(e.target.value)}} />}
            </div>
            {isAdmin === 'admin' ? <div>
                <span className='label'>Почта: </span>
                {!edit ? <input disabled type="email" value={nEmail ? nEmail : selected && selected[0].email} /> : <input className='edit' type="email" onChange={(e) => {setNEmail(e.target.value)}} />}
            </div> : null}
            <div>
                <span className='label'>Дата рождения: </span>
                {!edit ? <input disabled type="date" value={nBDate ? nBDate : selected && selected[0].bDate} /> : <input className='edit' type="date" onChange={(e) => {setNBDate(e.target.value)}} />}
            </div>

            {isAdmin === 'admin' ? !edit ? <button onClick={editFunc}>Редактировать</button> : <button onClick={saveFunc}>Сохранить</button> : null}
            {isAdmin === 'admin' ? <button onClick={deleteAcc} className='del'>Удалить</button> : null}
            
            {isAdmin === 'admin' ? selected && selected[0].role !== 'admin' ? <button className='setRole' onClick={setAdm}>Задать админку</button> : <button className='setRole edit' onClick={removeAdm}>Убрать админку</button> : null}
        </div>
    );
};

export default UserData;