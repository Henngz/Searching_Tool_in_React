import React, { useState, useEffect } from "react";

const url = "https://jsonplaceholder.typicode.com/users?id=";

function UserDisplay({ user, key }) {
  return (
    <ul>
      <li>Name: {user.name}</li>
      <li>Username: {user.username}</li>
      <li>E-mail: {user.email}</li>
    </ul>
  );
}

export default function Display() {
  const [searchTerm, setSearchTerm] = useState("");
  var test = '[{"id": "","name": "","username": "","email": ""}]';

  const [users, setUsers] = useState(JSON.parse(test));

  function FetchUsers() {
    fetch(`${url}${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }

  useEffect(() => FetchUsers(), [searchTerm]);

  const [change, setChange] = React.useState(false);
  const inputClass = change ? "on" : "off";

  return (
    <>
      <form className="search-form">
        <input
          className={inputClass}
          placeholder="Search user by id: 1 - 10"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setChange(!change);
          }}
          value={searchTerm}
        />
      </form>

      {users.map((u, i) => (
        <UserDisplay key={i} user={u} />
      ))}
    </>
  );
}
