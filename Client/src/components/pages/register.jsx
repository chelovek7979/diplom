import { useState } from 'react'
import '../Modal/modal.scss'
import gears from '../../../src/assets/gears.png'
import { Link,useNavigate } from 'react-router-dom'




function Register () {
//login,password,full_name,phone,email,role
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [email, setemail] = useState('')
  const [full_name, setfull_name] = useState('')
  const [phone, setphone] = useState('')

  const nav = useNavigate()

  const handlereg = async (e) => {
    e.preventDefault()

    try {

      const response = await fetch(
        'https://diplom-1-54sb.onrender.com/api/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            login,password,full_name,phone,email
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message);
        return;
        }


      alert(data.message)
        nav('/login')
      

      

    } catch (error) {

      console.log("ошибка сервера")

    }
  }

  return (
    <div className="modal">

      <div className="modal-content">

        <h2>Регистрация </h2>
        <form  onSubmit={handlereg}>

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


            <div className='login-field field'>
            <label htmlFor="">Введите почту</label>
            <input
              type="email"
              value={email}
              placeholder='example@gmail.com'
              onChange={(e) => setemail(e.target.value)}
            />

          </div>


        <div className='login-field field'>
            <label htmlFor="">Ваше ФИО</label>
            <input
              type="text"
              value={full_name}
              
              onChange={(e) => setfull_name(e.target.value)}
            />

          </div>

            <div className='login-field field'>
            <label htmlFor="">Номер телефона</label>
            <input
              type="tel"
              value={phone}
              placeholder="+7-XXX-XXX-XX-XX"
              onChange={(e) => setphone(e.target.value)}
            />

          </div>

          <div className='login-btn-section '>
            <button type='submit' className='green btn'>
              Зарегистрироваться
            </button>
            <Link to='/login' className='btn blue' >войти</Link>
            <Link to='/' className='btn' >Вернуться на главную</Link>
          </div>
        </form>

        
        

      </div>
      <img src={gears} alt="" className='img-gear' />

    </div>
  )
}

export default Register