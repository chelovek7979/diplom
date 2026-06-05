import { db } from "../db.js";

export const loginUser = (req, res) => {

  const { login, password } = req.body;

  const query =
    "SELECT * FROM users WHERE login = ? AND password = ?";

  db.query(query, [login, password], (err, data) => {

    if (err)
      return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(401).json({
        message: "Неверный логин или пароль",
      });
    }

    return res.json({
      message: "Успешный вход",
      user: data[0],
    });
  });
};

export const register = (req,res) =>{
  const {login,password,full_name,phone,email } = req.body

  const role = 'user'

  const  query = 
  "INSERT INTO users (login,password,full_name,phone,email,role) VALUES(?,?,?,?,?,?)"


  db.query(query,[login,password,full_name,phone,email,role],(err,data)=>{
    if(err){
      return res.status(500).json(err)
    }

    return res.status(200).json({
      message : 'Пользователь зарегистрирован'
    })
  })


}