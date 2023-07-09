const express = require('express');
const bodyParser = require('body-parser');
const con = require('./connection');

const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json());

app.get('/',  (req,res)=>{
    con.query("select * from student",(err,result)=>{
        if(err){
            throw err;
        }else{
            const rows = [];
            result.forEach((row) => {
            //   if (row.id == 1) {
                // Perform any desired operations with the data
                console.log(`ID: ${row.id}, Name: ${row.name}`);
                rows.push(row);
            //   }
            });
            res.send(rows);
        }
    });
});

app.post('/', async (req, res) => {
    const { body } = req;
    console.log(body);
    console.log(req.body.id);
    console.log(req.body.name);
    con.query('INSERT INTO student (id, name) VALUES (?, ?);', [req.body.id, req.body.name], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
        console.log(req.body);
      }
    });
  });
  

app.put('/:id',async  (req,res)=>{
    const data = [req.body.name, req.params.id];
  console.log(data);
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