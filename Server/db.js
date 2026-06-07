
import mysql from "mysql2";

// Подключение к базе через переменные окружения
export const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "root",
  database: process.env.DB_NAME || "Diplom_bd",
  port: Number(process.env.DB_PORT) || 3307
});

// Проверка подключения
db.connect(err => {
  if (err) {
    console.error("Ошибка подключения к базе:", err);
  } else {
    console.log("База данных подключена ");
  }
});