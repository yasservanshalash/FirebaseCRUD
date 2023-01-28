import React from "react";
import { useState, useEffect } from "react";
import { updateDoc, getDocs, doc, deleteDoc, collection } from "firebase/firestore";
import { db } from './firebase'

const User = ({ user, setUsers }) => {
    const [updateNameInput, setUpdateNameInput] = useState("");
    const [updateAgeInput, setUpdateAgeInput] = useState("");
    const usersDB = collection(db, 'users');

    const updateUser = async (id, name, age) => {
        let updateFields = {}
        if(updateNameInput !== "" && updateAgeInput !== "") {
            updateFields = {name: updateNameInput, age: updateAgeInput}
        } else if (updateNameInput !== "" && updateAgeInput === "") {
            updateFields = {name: updateNameInput}
        } else if(updateNameInput === "" && updateAgeInput !== "") {
            updateFields = {age: updateAgeInput}
        } else {
            updateFields = {}
        }
        const userDoc = doc(db, "users", id)
        console.log(updateFields)
        await updateDoc(userDoc, updateFields)
      }

      const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id)
        await deleteDoc(userDoc)
      }

      useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(usersDB)
          setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getUsers();
        }, [updateUser, deleteUser])
  return (
    <div>
      <h1>name: {user.name}</h1>
      <h2>Age: {user.age}</h2>
      <input type="text" placeholder="enter new name here" onChange={(e) => {setUpdateNameInput(e.target.value) }}/>
      <input type="age" placeholder="enter new age here" onChange={(e) => {setUpdateAgeInput(e.target.value) }}/>
      <button onClick={() => updateUser(user.id, updateNameInput, updateAgeInput)}>Update user</button>
      <button onClick={() => deleteUser(user.id)}>Delete User</button>
    </div>
  );
};

export default User;
