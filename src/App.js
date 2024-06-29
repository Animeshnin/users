import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users
//  Вывести всех пользователй


function App() {
  const [users, setUsers] = useState([]);
  const [invited, setInvited] = useState([]);
  const [isClicked, setClicked] = useState(false)

  useEffect(() => {
    fetch('https://reqres.in/api/users')
    .then(res => res.json())
    .then((json)=> {
      setUsers(json.data)
    }).catch(err => {
      console.warn(err);
      alert("При получения пользователя")
    })
  } , [])

  const onClickAddInvted = (id) =>{
    if(invited.includes(id)){
      setInvited((prev) => prev.filter(_id => _id !== id))
    } else {
    setInvited((prev) => [...prev, id])
    }
  }

  const onClickSetClicked = () => {
    setClicked(true)
  }
  return (
    <div className="App">
      {isClicked ? <Success count={invited.length}/> : 
            <Users 
            items={users}
            onClickAddInvted={onClickAddInvted}
            invited={invited}
            onClickSetClicked={onClickSetClicked}
            />}

      {/* <Success /> */}
    </div>
  );
}

export default App;
