const express = require('express');
const bodyparser =require('body-parser');
const cors =require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

// database Connection
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'locad_DB',
    port:3306
});

db.connect(err=>{
    if(err){console.log(err);}
    console.log('database connectes');
})

app.get('/products',(req,res)=>{
    console.log('get user');
    let qry = 'select * from product_list';
    db.query(qry,(err,result)=>{
        if(err){
            console.log(err,'err');
        }
        if(result.length>0){
            res.send(result)
        }else{
            res.send([])
        }
    });
})

app.post('/addProduct',(req,res)=>{
    let product_name = req.body.name;
    let qry = `insert into product_list(product_Name) values('${product_name}')`;
    db.query(qry,(err,result)=>{
        if(err){
            console.log(err,'err');
        }else{
            res.send({
                message:'Data saved'
            })
        }
    });
})

app.put('/updateProduct',(req,res)=>{
    console.log(req);
    let product_name = req.body.name;
    let product_id = req.body.id;
    let qry = `update product_list set product_Name = '${product_name}' where id = '${product_id}'`;
    db.query(qry,(err,result)=>{
        if(err){
            console.log(err,'err');
        }else{
            res.send({
                message:'Data updated'
            })
        }
    });
})

app.delete('/deleteProduct:id',(req,res)=>{
    let product_id = req.params.id;
    let qry = `delete from product_list where id = '${product_id}'`;
    db.query(qry,(err,result)=>{
        if(err){
            console.log(err,'err');
        }else{
            res.send({
                message:'Deleted successfully'
            })
        }
    });
})

app.listen(3000,()=>{
    console.log("server is running  bhai!");
})