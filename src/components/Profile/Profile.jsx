import React, { useEffect, useState } from 'react';
import './Profile.css';
import cookies from 'js-cookie';
import axios from 'axios';

const Profile = () => {
    const[name, setName] = useState();
    const[lName, setLName] = useState();
    const[fName, setFName] = useState();
    const[img, setImg] = useState();
    const[jobTitle, setJobTitle] = useState();
    const[department, setDepartment] = useState();
    const[wPhone, setWPhone] = useState();
    const[phone, setPhone] = useState();
    const[email, setEmail] = useState();
    const[bDate, setBDate] = useState();
    const[edit, setEdit] = useState(false);
    const[username, setUsername] = useState();

    const[departments, setDepartments] = useState();
    const[jobTitles, setJobTitles] = useState();

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
        cookies.get('auth') && axios.post('/user-data', {
            token: cookies.get('auth')
        })
        .then(response => {
            setName(response.data[0] && response.data[0].name);
            setLName(response.data[0] && response.data[0].lname);
            setFName(response.data[0] && response.data[0].fName);
            setImg(response.data[0] && response.data[0].img);
            setJobTitle(response.data[0] && response.data[0].jobTitle);
            setDepartment(response.data[0] && response.data[0].department);
            setWPhone(response.data[0] && response.data[0].wPhone);
            setPhone(response.data[0] && response.data[0].phone);
            setEmail(response.data[0] && response.data[0].email);
            setBDate(response.data[0] && response.data[0].bDate);
            setUsername(response.data[0] && response.data[0].username);
        })
        .catch(err => {
            console.log(err);
        });
    }, [edit]);

    useEffect(() => {
        axios.get('/departments/departments')
        .then(response => {
            setDepartments(response.data);
        })
        .catch(err => {
            console.log(err);
        });

        axios.get('/departments/job-titles')
        .then(response => {
            setJobTitles(response.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    const editFunc = () => {
        setEdit(true)
    }

    const saveFunc = () => {
        setEdit(false);

        axios.post('/user-data/save-data', {
            token: cookies.get('auth'),
            name: nName ? nName : name,
            lName: nLName ? nLName : lName,
            fName: nFName ? nFName : fName,
            jobTitle: nJobTitle ? nJobTitle : jobTitle,
            department: nDepartment ? nDepartment : department,
            wPhone: nWPhone ? nWPhone : wPhone,
            phone: nPhone ? nPhone : phone,
            email: nEmail ? nEmail : email,
            img: nImg ? nImg : img,
            bDate: nBDate ? nBDate : bDate
        })
        .catch(err => {
            console.log(err);
        });
    }

    const selectImg = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        const {data} = await axios.post('/upload', formData);
        
        setNImg(data.url);
    }

    const logout = () => {
        cookies.remove('auth');
        window.location.reload();
    }

    return (
        <div id='profile'>
            <div className="imgFile">
                <div className="img">
                    <img src={nImg ? nImg : img} alt="ava" />
                </div>
                {edit && <input type="file" onChange={selectImg} />}
            </div>
            <div>
                <span className='label'>Имя пользователя: </span>
                <input type="text" value={username} disabled style={{textDecoration: 'underline', textUnderlineOffset: '3px'}} />
            </div>
            <div>
                <span className='label'>Имя: </span>{!edit ? <input disabled type="text" value={name && name} /> : <input onChange={(e) => {setNName(e.target.value)}} className='edit' type="text" value={nName && nName} />}
            </div>
            <div>
                <span className='label'>Фамилия: </span>{!edit ? <input disabled type="text" value={lName && lName} /> : <input onChange={(e) => {setNLName(e.target.value)}} className='edit' type="text" value={nLName && nLName} />}
            </div>
            <div>
                <span className='label'>Отчество: </span>{!edit ? <input disabled type="text" value={fName && fName} /> : <input onChange={(e) => {setNFName(e.target.value)}} className='edit' type="text" value={nFName && nFName} />}
            </div>
            <div>
                <span className='label'>Отдел: </span>{!edit ? <input disabled type="text" value={department && department} /> : <select value={nDepartment ? nDepartment : department && department} className='edit' onChange={(e) => {setNDepartment(e.target.value)}}>
                    {departments && departments.map(e => {
                                return <option key={e.id} value={e.department}>{e.department}</option>
                            })}
                    </select>}
            </div>
            <div>
                <span className='label'>Должность: </span>{!edit ? <input disabled type="text" value={jobTitle && jobTitle} /> : <select value={nJobTitle ? nJobTitle : jobTitle && jobTitle} className='edit' onChange={(e) => {setNJobTitle(e.target.value)}}>
                    {jobTitles && jobTitles.map(e => {
                                return <option key={e.id} value={e.jobTitle}>{e.jobTitle}</option>
                            })}
                    </select>}
            </div>
            <div>
                <span className='label'>Рабочий номер тел.: </span>{!edit ? <input disabled type="number" value={wPhone && wPhone} /> : <input onChange={(e) => {setNWPhone(e.target.value)}} className='edit' type="number" value={nWPhone && nWPhone} />}
            </div>
            <div>
                <span className='label'>Номер тел.: </span>{!edit ? <input disabled type="number" value={phone && phone} /> : <input onChange={(e) => {setNPhone(e.target.value)}} className='edit' type="number" value={nPhone && nPhone} />}
            </div>
            <div>
                <span className='label'>Почта: </span>{!edit ? <input disabled type="email" value={email && email} /> : <input onChange={(e) => {setNEmail(e.target.value)}} className='edit' type="email" value={nEmail && nEmail} />}
            </div>
            <div>
                <span className='label'>Дата рождения: </span>{!edit ? <input disabled type="date" value={bDate && bDate} /> : <input onChange={(e) => {setNBDate(e.target.value)}} className='edit' type="date" value={nBDate && nBDate} />}
            </div>

            {!edit ? <button onClick={editFunc}>Редактировать</button> : <button onClick={saveFunc}>Сохранить</button>}
            <button onClick={logout} className='logout'>Выйти</button>
        </div>
    );
};

export default Profile;