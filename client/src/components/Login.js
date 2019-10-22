import React, { useState } from 'react';
import axios from 'axios';



function Login(props) {
  const [isLogin, setLogin] = useState(false)
  const [userAcc, setUserAcc] = useState({ username:"", password: ""});
  // const [registerAcc, setRegisterAcc] = useState({username:"", password1:"", password2:""})

  const handleLogin = e => {
    e.preventDefault();
    axios
      .post('http://lambda-mud-test.herokuapp.com/api/login/', userAcc)
        .then(res => {
          console.log(res.data)
          localStorage.setItem("key", res.data.key)
        }).catch(error => {
          console.log('error logging in', error)
        })
  }

  // const handleRegister = e => {
  //   e.preventDefault();
  //   axios
  //     .post('http://lambda-mud-test.herokuapp.com/api/registration/', registerAcc)
  //       .then(res => {
  //         localStorage.setItem("token", res.data.key);
  //       }).catch(error => {
  //         console.log('clg error', error)
  //       })
  // }

  const loginChange = e => {
    setUserAcc({
      ...userAcc,
      [e.target.name]: e.target.value
    })
  }

  // const registerChange = e => {
  //   setRegisterAcc({
  //     ...registerAcc,
  //     [e.target.name]: e.target.value
  //   })
  // }

  function toggleForm() {
    if (isLogin) {
      setLogin(false)
    } else {
      setLogin(true)
    }
  }

  return (
    <div className="wrapper">
    <div className="login-form">
    {/* <div>
      <button onClick={toggleForm}>
        {isLogin ? "Login" : "Register"}
      </button>
    </div> */}
      <form onSubmit={handleLogin}>
        
        <input
          type="text"
          name="username"
          placeholder="username"
          value={userAcc.username}
          onChange={loginChange}
        />


        <input
          type="text"
          name="password"
          placeholder="password"
          value={userAcc.password}
          onChange={loginChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>


{/* <div className="register-form">
  <form onSubmit={handleRegister}>
    
    <input
      type="text"
      name="username"
      placeholder="username"
      value={registerAcc.username}
      onChange={registerChange}
    />


    <input
      type="text"
      name="password"
      placeholder="password"
      value={registerAcc.password1}
      onChange={e => setRegisterAcc(e.target.value)}
    />

    <input
      type="text"
      name="password"
      placeholder="enter password again"
      value={registerAcc.password2}
      onChange={e => setRegisterAcc(e.target.value)}
    />
    <button type="submit">Register</button>
  </form>
  </div> */}
</div>
  )
}

export default Login