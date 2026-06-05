import { useState } from 'react'
import './modal.scss'
import gears from '../../../src/assets/gears.png'
import { Link,useNavigate } from 'react-router-dom'




function LoginModal({ setUser}) {

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {

      const response = await fetch(
        'https://diplom-1-54sb.onrender.com/api/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            login,
            password
          })
        }
      )

      const data = await response.json()

      if (response.ok) {

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setUser(data.user);nav('/')
      

      } else {

        alert(data.message)

      }

    } catch (error) {

      console.log(error)

    }
  }

  return (
    <div className="modal">

      <div className="modal-content">

        <h2>Вход </h2>
        <form  onSubmit={handleLogin}>

          <div className='login-field field'>
            <label htmlFor="">Введите Логин</label>
            <input
              type="text"
              placeholder="Логин"
              onChange={(e) => setLogin(e.target.value)}
            />

          </div>

          <div className='password-field field'>
            <label htmlFor="">Введиете пароль</label>
            <input
              type="password"
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='login-btn-section '>
            <button type='submit' className='green btn'>
              Войти
            </button>
            <Link to='/register' className='btn blue' >Зарегистрироваться</Link>
            <Link to='/' className='btn' >Вернуться на главную</Link>
          </div>
        </form>
      </div>
      <img src={gears} alt="" />

    </div>
  )
}

export default LoginModal