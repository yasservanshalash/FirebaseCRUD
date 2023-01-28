import { useState, useEffect } from 'react';
import { db } from './firebase'
import { collection, getDocs, addDoc} from 'firebase/firestore'
import User from './User';
import './App.css';

function App() {
  const [nameInput, setNameInput] = useState("");
  const [ageInput, setAgeInput] = useState("");

  const [users, setUsers] = useState([]);
  const usersDB = collection(db, 'users');

  const createUser = async () => {
    await addDoc(usersDB, {name: nameInput, age: ageInput})
  }


   useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersDB)
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    getUsers();
    }, [])
    console.log(users)
  return (
    <div className="App">
      <input type="text" placeholder="enter user name" value={nameInput} onChange={(e) => setNameInput(e.target.value)}/>
      <input type="number" placeholder="Enter age" value={ageInput} onChange={(e) => setAgeInput(e.target.value)}/>
      <button onClick={createUser}>Create user</button>
      {
        users.map((user) => <User key={crypto.randomUUID()} user={user} setUsers={setUsers}/>)
      }
    </div>
  );
}

export default App;
