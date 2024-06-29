import React from 'react';
import { Skeleton } from './Skeleton';
import { User } from './User';

export const Users = ({ items, isLoading, onClickAddInvted, invited, onClickSetClicked }) => {
  const [searchValue, setSearchValue] = React.useState('')


  const handleKeyDown = (event) => {
    setSearchValue(event.target.value)
  }
  console.log(invited.length)
  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input value={searchValue} onChange={(event) => handleKeyDown(event)} type="text" placeholder="Найти пользователя..." />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {
            items.filter(obj => {
              const full_name = (obj.first_name + obj.last_name).toLowerCase()
              return full_name.includes(searchValue.toLowerCase()) || obj.email.includes(searchValue.toLowerCase())
            })
            .map(obj => (
          <User 
          isInvited={invited.includes(obj.id)}
          {...obj}
          onClickAddInvted={onClickAddInvted}
          />
            
            ))
          }
        </ul>
      )}
      
      {
        invited.length ===  0 ? "" : 
        <button onClick={() => onClickSetClicked()} className="send-invite-btn">Отправить приглашение</button>
      }
      
    </>
  );
};
