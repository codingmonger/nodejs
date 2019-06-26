//CRUD
//get,post,put ,delete
//Parse data from JSON POST and insert into MYSQL

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var fs = require("fs");

var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(jsonParser);
app.use(urlencodedParser);


// Configure MySQL connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shubham@279590",
  database: "shubham"
  
});

//Establish MySQL connection
con.connect(function(err) {
 if (err){throw err;} 
 else {
     console.log('Connected to MySQL');
     //Start the app when connection is ready
     app.listen(3000);
     console.log('Server listening on port 3000');
     
  }
});


app.get('/user', function(req, res) {
  //r = res.sendFile(path.join(__dirname+ '/data.json'));
  var _query = "SELECT * FROM customers";

  con.query(_query,function(err,rows,fields) {
    let data = {};
    if(!err) {
      // success
      data = {
        success : true,
        data : rows
      }
    } else {
      // fail
      data = {
        success : false,
        data : "Unable to fetch data"
      }
    }
    res.send(data);
    res.end();
  });
});


app.post('/createuser', function(req, res) {
  //getting data from json file user.js
  var name = req.body.name
  var addr = req.body.address;
  console.log(name,addr)
  var data = [
    [name,addr]
  ]; 

  var sql = "INSERT INTO customers (name, address) VALUES ?";
  con.query(sql, [data], function(err,result){
    if(!err) {
      res.send({
        success : true
      });
    } else {
      res.send({
        success : false,
        msg : err
      });      
    }
    res.end();
    console.log("Number of records created: "+ result.affectedRows);
    })  
});


app.delete('/deleteuser',(req,res) => {
  r = req.body.name
  console.log(r)
  var sql = "DELETE FROM customers WHERE name = ?";
  con.query(sql,[r],function(err,result){
    if(!err) {
      res.send({
        success : true
      });
    } else {
      res.send({
        success : false,
        msg : err
      });      
    }
    res.end();
    console.log("Number of records inserted: "+ result.affectedRows);
    })
});


app.put('/updateuser',(req,res) => {
  r2 = req.body.name[0];
  r1 = req.body.name[1];
  var sql = "UPDATE customers SET name = ? WHERE name = ?";
  con.query(sql,[r1,r2],function(err,result){
    if(!err) {
      res.send({
        success : true

      });
    } else {
      res.send({
        success : false,
        msg : err
      });      
    }
    res.end();
    console.log("Number of records updated: "+ result.affectedRows);
    })
});


