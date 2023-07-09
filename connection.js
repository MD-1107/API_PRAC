const mysql=require('mysql2')
const conn=mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password: 'Maanu1107%',
        database:'prac'
    });


    conn.connect((err)=>{
        if(err)
        {
            console.log(err);
        }
        else 
        {
            console.log("connection is successful");
        }
    })

    module.exports=conn;