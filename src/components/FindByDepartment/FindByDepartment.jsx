import React, { useEffect, useState } from 'react';
import './FindByDepartment.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FindByDepartment = () => {
    const[departments, setDepartments] = useState();
    const[match, setMatch] = useState();

    useEffect(() => {
        axios.get('/user-data/get-department')
        .then(response => {
            const uniqueIds = [];
                  
            const unique = response.data.filter(element => { // del duplicate obj props/teams
                const isDuplicate = uniqueIds.includes(element.department);
                if (!isDuplicate) {
                    uniqueIds.push(element.department);
                    return true;
                }
                  
                return false;
            });
            setDepartments(unique && unique.map((e, i) => {
                return <option key={e.department} value={e.department}>{e.department}</option>
            }));
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    const selectDep = (e) => {
        axios.post('/user-data/find-by-department', {
            department: e.target.value
        })
        .then(response => {
            setMatch(response.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div id='allMembers'>
            <div className="wrap">
                <select onChange={selectDep} name="" id="" defaultValue={'none'}>
                    <option value="none" disabled>Выбери доступный отдел</option>
                    {departments}
                </select>
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

export default FindByDepartment;