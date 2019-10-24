import React, { useState } from 'react';
import axios from 'axios';
import { Link} from "react-router-dom";



function Register(props) {
  const [isLogin, setLogin] = useState(false)
  const [registerAcc, setRegisterAcc] = useState({username:"", password1:"", password2:""})


  const handleRegister = e => {
    e.preventDefault();
    axios
      .post('https://build-week-game-server.herokuapp.com/api/registration/', registerAcc)
        .then(res => {
          console.log(res.data);
          localStorage.setItem("key", res.data.key);
          props.history.push('/game')
          window.location.reload()
        }).catch(error => {
          console.log('clg error', error)
        })
  }


  const registerChange = e => {
    setRegisterAcc({
      ...registerAcc,
      [e.target.name]: e.target.value
    })
  }

  // function toggleForm() {
  //   if (isLogin) {
  //     setLogin(false)
  //   } else {
  //     setLogin(true)
  //   }
  // }

  return (
    <div className="wrapper">
    <div className="loginForm">
      <form className="form" onSubmit={handleRegister}>
      <h1>Welcome to ESC Dungeon</h1>
        <input
          className="formInput"
          type="text"
          name="username"
          placeholder="username"
          value={registerAcc.username}
          onChange={registerChange}
        />


        <input
          className="formInput"
          type="password"
          name="password1"
          placeholder="password"
          value={registerAcc.password1}
          onChange={registerChange}
        />

        <input
          className="formInput"
          type="password"
          name="password2"
          placeholder="enter password again"
          value={registerAcc.password2}
          onChange={registerChange}
        />
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Already have an account?</Link>
    </div>
</div>
  )
}

export default Register
