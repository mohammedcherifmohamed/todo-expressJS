
const  {Router} =  require("express");
const pool = require('../db');

const router = Router();


router.post('/', async (req,res)=>{

    try{

        // console.log(req.body);
        const {title , completed }= req.body ;
        
        const newTodo = await pool.query(

            "INSERT INTO todo (title,completed) values($1,$2) RETURNING * ",
            [title, completed || false]
        );

        res.json(newTodo.rows[0]);

    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }

});
router.get('/', async (req,res)=>{

    try{

        // console.log(req.body);
        // const {title , completed }= req.body ;
        
        const newTodo = await pool.query(
            "select * from todo",
        );

        res.json(newTodo.rows);

    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }

});

router.put('/:id',async (req,res)=>{
    try{

        const {id} = req.params ; 

        const newTodo = await pool.query(
            "update todo set completed = true where id = $1 RETURNING *",
            [id]
        )

        console.log(req.body);

    }catch(e){
        console.log(e.message);
        res.status(500).send("Server Error");
    }
})


module.exports = router;