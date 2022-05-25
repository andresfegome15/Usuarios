import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import UsersList from "./components/UsersList";
import UsersForm from "./components/UsersForm";
function App() {
  /*states */
  const [users, setUsers] = useState([]);
  const [selectUser, setSelectUser] = useState(null);
  const [statusSearch, setStatusSearch] = useState(null);
  const [noFound, setNoFound] = useState(null);

  /*petitions */
  useEffect(() => {
    getUser();
  }, []);

  /*Funtions*/
  const getUser = () => {
    axios
      .get(`https://users-crud1.herokuapp.com/users/`)
      .then((res) => setUsers(res.data))
      .catch((error) => console.log(error.response));
  };

  const addUser = (addUser) => {
    axios
      .post(`https://users-crud1.herokuapp.com/users/`, addUser)
      .then(() => getUser())
      .catch((error) => console.log(error.response));
  };

  const getsearch = (search) => {
    axios
      .get(`https://users-crud1.herokuapp.com/users/${search}/`)
      .then((res) => setUsers(res.data))
      .catch((error) => setNoFound(error.response));
  };
  const cancelSeacrh = () => {
    getUser();
  };
  const updateUser = (userUpdate) => {
    axios
      .put(
        `https://users-crud1.herokuapp.com/users/${selectUser.id}/`,
        userUpdate
      )
      .then(() => getUser())
      .catch((error) => console.log(error.response));
  };

  const deleteUser = (id) => {
    axios
      .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(() => getUser())
      .catch((error) => console.log(error.response));
    setStatusSearch(null);
  };

  const userselect = (user) => {
    setSelectUser(user);
  };

  const inselectUser = (res) => {
    setSelectUser(res);
  };

  return (
    <div className="App">
      <UsersForm
        addUser={addUser}
        selectUser={selectUser}
        inselectUser={inselectUser}
        updateUser={updateUser}
        getsearch={getsearch}
        cancelSeacrh={cancelSeacrh}
      />
      <div className="container-users">
        <UsersList
          users={users}
          userselect={userselect}
          deleteUser={deleteUser}
          statusSearch={statusSearch}
          noFound={noFound}
        />
      </div>
    </div>
  );
}

export default App;
