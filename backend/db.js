
const {Pool }= require('pg') ;

const pool = new Pool({

    user:'postgres',
    password:'postgress',
    host:"localhost",
    port:5432,
    database:"todos"

});

module.exports = pool;