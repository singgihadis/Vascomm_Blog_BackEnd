const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pool = require('./db');
var crypto = require('crypto');
var uuid = require('uuid');
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "5mb" }));
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.post(['/login'],(req, res) => {
  pool.getConnection(function(err, connection) {
      if (err) throw err;
      var email = "";
      if(req.body.email != undefined){
        email = req.body.email;
      }
      var password = "";
      if(req.body.password != undefined){
        password = req.body.password;
        password = crypto.createHash('sha1').update(password).digest("hex");
      }
      var sql_data = "select * from user where email=? and password=?";
      var query_data = connection.query(sql_data,[email,password], function (err, results, fields) {
         if (err) throw err;
         if(results.length == 0){
           connection.release();
           var data = {is_error:true,msg:"Login salah",token:""};
           res.send(JSON.stringify(data));
           res.end();
         }else{
           var user_id = results[0]['id'];
           var token = uuid.v4();
           var sql_token = "insert into user_token(user_id,token) values(?,?)";
           var query_token = connection.query(sql_token,[user_id,token], function (err, results_token, fields) {
              if (err){
                connection.release();
                var data = {is_error:true,msg:"Gagal login",token:""};
                res.send(JSON.stringify(data));
                res.end();
              }else{
                connection.release();
                var data = {is_error:false,msg:"Berhasil login",token:token};
                res.send(JSON.stringify(data));
                res.end();
              }
           });
         }
      });
  });
});
app.post(['/login_cek'],(req, res) => {
  pool.getConnection(function(err, connection) {
      if (err) throw err;
      var token = "";
      if(req.body.token != undefined){
        token = req.body.token;
      }
      var sql_login = "select a.* from user a inner join user_token b on a.id=b.user_id where b.token=?";
      var query_data = connection.query(sql_login,[token], function (err, results, fields) {
         if (err) throw err;
         if(results.length == 0){
           connection.release();
           var data = {is_error:true,msg:"Token tidak valid",data:[]};
           res.send(JSON.stringify(data));
           res.end();
         }else{
           connection.release();
           var data = {is_error:false,msg:"Token valid",data:results};
           res.send(JSON.stringify(data));
           res.end();
         }
      });
  });
});
var server = app.listen(3001, () => {
  console.log('Server is running at port 3001');
});
