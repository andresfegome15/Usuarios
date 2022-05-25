import React, {useState } from 'react';

const UsersList = ({users,userselect,deleteUser,noFound}) => {

 
    const [statusError, setStatusError] = useState(true)
    const [statusdelete, setStatusdelete] = useState(false)
    const [deleteId, setdeleteID] = useState ()

    const deleteSelect = (id) =>{
        
        setStatusdelete(true)
        setdeleteID(id)
    }
    const clearformshow =()=>{
        deleteUser(deleteId)
        setStatusdelete(!statusdelete)
    }

    const error404 =()=> {
        
          setTimeout(() => {
            setStatusError(!statusError)
        }, 1500);
        }

        
    
    return (
        <> 
        
        {users.length > 0 && users.map(user=>(<ul className='item-user' key={user.id}>
            
        <li key={user.id}>
            <h2 className='name-user'> {user.first_name} {user.last_name}</h2>
            <p><b className='title-user'>Email </b><span>{user.email}</span></p>
            <p><b className='title-user'>Birthday </b><span>{user.birthday}</span></p>
            <button className='button-action' type='button' onClick={()=>userselect(user)}><i className="fa-solid fa-repeat"></i></button>
            
            <button className='button-action' type='button' onClick={()=>deleteSelect(user.id)}><i className="fa-solid fa-trash"></i></button>
        </li></ul>

    )) }{
        users.length === undefined &&  
        users.id !== "" &&
        <ul className='item-user' key={users.id}>
        <li key={users.id}>
            <h2 className='name-user'> {users.first_name} {users.last_name}</h2>
            <p><b className='title-user'>Email </b><span>{users.email}</span></p>
            <p><b className='title-user'>Birthday </b><span>{users.birthday}</span></p>
            <button className='button-action' type='button' onClick={()=>userselect(users)}><i className="fa-solid fa-repeat"></i></button>
            <button className='button-action' type='button' onClick={()=> deleteSelect(users.id)}><i className="fa-solid fa-trash"></i></button>
        </li></ul>
        
    }
    {statusdelete === true &&
    <>
        <div className='modal'>
            <h2>User Delete?</h2>
            <button type="button" onClick={()=> clearformshow()} >Eliminar</button>
            <button type="button" onClick={()=>setStatusdelete(!statusdelete)}>cancelar</button>
        </div>

        <div className='overlay' onClick={()=>setStatusdelete(false)}></div></>
    }

    {
            noFound?.request.status === 404 && statusError === true &&   <>
            {error404()}
          
            <div className='modal error'>
                <h3>No se encontró usuario con id</h3>
            </div>

            <div className='overlay' onClick={()=>setStatusError(!statusError)}></div></>
        }

    
    </>
    );
};

export default UsersList;