import React, { useState } from 'react';
import './Search.css';

import search from '../../assets/ico/search.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Search = () => {
    const[text, setText] = useState();
    const[match, setMatch] = useState();

    const searchFunc = async () => {
        text && await axios.post('/search', {
            text
        })
        .then(response => {
            setMatch(response.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div id='search'>
            <div className="wrap">
                <input type="text" placeholder='Поиск сотрудника' onChange={(e) => {setText(e.target.value)}} />
                <img src={search} alt="search" onClick={searchFunc} />
                <div className="matchList">
                    <ul>
                        {match && match.map(e => {
                            return <Link to={`/user-data/${e.id}`} id={'user' + e.id} key={'user' + e.id}>
                                        <li>{e.name} {e.lname} {e.fName} | Отдел: {e.department}, Должность: {e.jobTitle}</li>
                                    </Link>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Search;