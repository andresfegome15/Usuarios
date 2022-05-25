
import React, { useEffect, useState } from 'react';



const UsersForm = ({addUser, selectUser, inselectUser, updateUser, getsearch, cancelSeacrh,}) => {
    const [isVisible, setIsVisible] = useState(false)
    const [showform, setShowForm] =useState(false)
    const [searchstatus, setSearchStatus] = useState(false)
    const [name, setName]=useState("")
    const [lastname, setLastname]=useState("")
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [birthday, setBirthday]=useState("")
    const [search, setSearch] = useState("")

    useEffect(()=>{;
        if(selectUser!==null){
            setName(selectUser?.first_name);
            setLastname(selectUser?.last_name);
            setEmail(selectUser?.email)
            setPassword(selectUser?.password)
            setBirthday(selectUser?.birthday)
            setShowForm(true)
        }
    },[selectUser])
    const clearInput=()=>{
        setName("");
            setLastname("");
            setEmail("")
            setPassword("")
            setBirthday("")
    }
    const submit =e =>{
        e.preventDefault()
        const user = {email:email,password:password,first_name:name,last_name:lastname,birthday:birthday}
        if(selectUser === null){
          addUser(user)
          clearInput()
         setShowForm(!showform)
        }else{
            
            updateUser(user)
            inselectUser(null);
            clearInput()
          
        }
        setShowForm(!showform)
      }
      const clearState =()=>{
          setShowForm(!showform)
          inselectUser(null)
          setName("");
           clearInput()
      }
      
      const statusSearch=()=>{
          if(searchstatus ===false){
              getsearch(search)
              setSearch("")
              setSearchStatus(true)

          }else{
            cancelSeacrh(null)
            setSearchStatus(false)
          }
          
      }

    return (
        <div className='divuserform'>
            <header className='header'>
                <h1>Usuarios</h1>
                <input type="number" 
                    className='inputseacrh' 
                    onChange={e=> setSearch(e.target.value)}
                    value={search}
                    placeholder='Id ejm: 1234'/>
                    <button className='buttons-search' type='button' onClick={()=>{statusSearch()}}>{searchstatus?"X":">>"}</button>
            <button type='button' className='button-add' onClick={()=> setShowForm(!showform)}>+ Crear Usuario</button>
        
      </header>
      {showform===true&&
                        <><div className="modal">
                           <form onSubmit={submit} className='formuser' action="" >
                                    <h1 className='titleUser'>{selectUser !== null &&"Update User"}{selectUser === null &&"New User"}</h1>
                                    <button className='closeForm' onClick={clearState}>x</button>
                                    <div className="divform">
                                        <label htmlFor="name">Nombre<i className="fa-solid fa-circle-x"></i></label>
                                        <input type="text" placeholder='Name'
                                                id="name"
                                                onChange={e=> setName(e.target.value)}
                                                value={name}
                                                required/>
                                    </div>
                                    <div className="divform">
                                        <label htmlFor="apelidos">Apellidos</label>
                                        <input type="text" placeholder='Lastname'
                                                id='apellidos'
                                                onChange={e=> setLastname(e.target.value)}
                                                value={lastname}
                                                required/>
                                    </div>
                                    <div className="divform">
                                        <label htmlFor="email">Email</label>
                                        <input type="text"  id="email" placeholder='E-mail'
                                         onChange={e=> setEmail(e.target.value)}
                                         value={email}
                                         required/>
                                    </div>
                                    <div className="divform">
                                        <label htmlFor="password">Password</label>
                                        <input type={isVisible? "text":"password"} id="password" placeholder='********' 
                                        onChange={e=> setPassword(e.target.value)}
                                        value={password}
                                        required/>
                                        <button className='buttonsee' type='button' onClick={()=>setIsVisible(!isVisible)}>
                                            {isVisible? <i className="fa-solid fa-eye"></i>:<i className="fa-solid fa-eye-slash"></i>}
                                        </button>
                                    </div>
                                    <div className="divform">
                                        <label htmlFor="birthday">Nacimiento</label>
                                        <input type="date" id="birthday" 
                                        onChange={e=> setBirthday(e.target.value)}
                                        value={birthday}
                                        required/>
                                    </div>
                                    <button className='submit'>Submit</button>
                                    {
                                        selectUser !==null &&
                                        <button className='cancelsubmit' type='button' onClick={clearState}>Cancel</button>
                                    }
                                </form>
                                
                        </div>
                        <div className='overlay' onClick={clearState}>
                            
                        </div></>
                        
           }





                
     
            
        </div>
    );
};

export default UsersForm;