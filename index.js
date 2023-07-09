const con = require('./connection');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req,res)=>{
    con.query("select * from student",(err,result)=>{
        if(err){
            throw err;
        }else{
                result.forEach((row) => {
                  // Access each row's data
                 if(row.id==1)
                  // Perform any desired operations with the data
                  console.log(`ID: ${row.id}, Name: ${row.name}`);
                });
        }
    });
});

app.post('/',(req,res)=>{
   const data = {id:7, name:'Draco'};
   con.query('INSERT INTO student (id, name) VALUES (?, ?)', [data.id, data.name], (err, result) => {
    if(err){
        throw err;
    }else{
        res.send(result);
        console.log(data);
    }
});
});

app.put('/:id', (req,res)=>{
    const data = [req.body.name,req.body.email,req.body.phone,req.params.id];
    con.query("UPDATE student SET name = ? where id = ?",data,(err,result)=>{
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    })
});

app.delete('/:id', (req,res)=>{
    let student_id = req.params.id;
    con.query("DELETE from student where id = "+student_id,(err,result)=>{
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    });
})
app.listen(3000);