
import {Router} from "epress";
import pool from '../db.js';

const router = Route();

router.post('/', async (req,res)=>{

try{

    const {title , completed }= req.body ;
    const newTodo = await pool.query(

        "INSERT INTO todos (title,completed) values($1,$2) RETURNING * ",
        [title, completed || false]
    );

    res.json(newTodo.rows[0]);

}catch(err){
    console.log(err.message);
    res.status(500).send("Server Error");
}

});


export default router ;