import { useState } from 'react'
import './modal.scss'
import gears from '../../../src/assets/gears.png'

function LoginModal({ close, setAdmin }) {

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {

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

        setAdmin(true)

        close()

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

        <h2>Вход администратора</h2>

        <input
          type="text"
          placeholder="Логин"
          onChange={(e) => setLogin(e.target.value)}
        />

        <input
          type="password"
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Войти
        </button>

        <button onClick={close}>
          Закрыть
        </button>

      </div>
      <img src={gears} alt="" />

    </div>
  )
}

export default LoginModal