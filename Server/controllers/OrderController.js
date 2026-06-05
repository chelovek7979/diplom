import { db } from "../db.js";

export const createOrder = (req,res) =>{
    const{
        total_sum,
        created_at,
        user_login,
        user_full_name,
        user_number,
        discont,
        user_id,
        items_count
    } = req.body

    const status = 'paid'
    const payment_method = 'mir'

    db.query (query,(
        total_sum,
        created_at,
        user_login,
        user_full_name,
        user_number,
        discont,
        user_id,
        items_count
    ),(err,data) =>{
        if(err){
            return res.status(500).json(err)
        }

        return res.json({
            message: "Оплата прошла успешно"
        })
    })
}