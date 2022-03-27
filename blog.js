const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pool = require('./db');
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "5mb" }));
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.post(['/blog'],(req, res) => {
  pool.getConnection(function(err, connection) {
      if (err) throw err;
      var token = "";
      if(req.body.token != undefined){
        token = req.body.token;
      }
      var id = "";
      if(req.body.id != undefined){
        id = req.body.id;
      }
      var filter = "";
      if(id != ""){
        filter = " where id=" + id;
      }
      var sql_login = "select a.* from user a inner join user_token b on a.id=b.user_id where b.token=?";
      var query_data = connection.query(sql_login,[token], function (err, results, fields) {
         if (err) throw err;
         if(results.length == 0){
           connection.release();
           var data = {is_error:true,data:[],msg:"Token tidak valid",logout:true};
           res.send(JSON.stringify(data));
           res.end();
         }else{
           var sql_data = "select * from blog" + filter;
           var query_data = connection.query(sql_data, function (err, results, fields) {
              if (err) throw err;
              if(results.length == 0){
                connection.release();
                var data = {is_error:true,data:[],msg:"Data tidak ditemukan",logout:false};
                res.send(JSON.stringify(data));
                res.end();
              }else{
                connection.release();
                var data = {is_error:false,data:results,logout:false};
                res.send(JSON.stringify(data));
                res.end();
              }
           });
         }
      });
  });
});
app.post(['/blog/insert'],(req, res) => {
  pool.getConnection(function(err, connection) {
    var token = "";
    if(req.body.token != undefined){
      token = req.body.token;
    }
    var judul = "";
    if(req.body.judul != undefined){
      judul = req.body.judul;
    }
    var isi = "";
    if(req.body.isi != undefined){
      isi = req.body.isi;
    }
    var sql_login = "select a.* from user a inner join user_token b on a.id=b.user_id where b.token=? and a.role=1";
    var query_data = connection.query(sql_login,[token], function (err, results, fields) {
       if (err) throw err;
       if(results.length == 0){
         connection.release();
         var data = {is_error:true,data:[],msg:"Token tidak valid"};
         res.send(JSON.stringify(data));
         res.end();
       }else{
         var sql_data = "insert into blog(judul,isi) values(?,?)";
         var query_data = connection.query(sql_data,[judul,isi], function (err, results, fields) {
            if (err) {
              connection.release();
              var data = {is_error:true,data:[],msg:"Gagal tambah"};
              res.send(JSON.stringify(data));
              res.end();
            }else{
              connection.release();
              var data = {is_error:false,data:[],msg:"Berhasil tambah"};
              res.send(JSON.stringify(data));
              res.end();
            }
         });
       }
    });
  });
});
app.post(['/blog/update'],(req, res) => {
  pool.getConnection(function(err, connection) {
    var token = "";
    if(req.body.token != undefined){
      token = req.body.token;
    }
    var id = "";
    if(req.body.id != undefined){
      id = req.body.id;
    }
    var judul = "";
    if(req.body.judul != undefined){
      judul = req.body.judul;
    }
    var isi = "";
    if(req.body.isi != undefined){
      isi = req.body.isi;
    }
    var sql_login = "select a.* from user a inner join user_token b on a.id=b.user_id where b.token=? and a.role=1";
    var query_data = connection.query(sql_login,[token], function (err, results, fields) {
       if (err) throw err;
       if(results.length == 0){
         connection.release();
         var data = {is_error:true,data:[],msg:"Token tidak valid"};
         res.send(JSON.stringify(data));
         res.end();
       }else{
         var sql_data = "update blog set judul=?,isi=? where id=?";
         var query_data = connection.query(sql_data,[judul,isi,id], function (err, results, fields) {
            if (err) {
              connection.release();
              var data = {is_error:true,data:[],msg:"Gagal update"};
              res.send(JSON.stringify(data));
              res.end();
            }else{
              connection.release();
              var data = {is_error:false,data:[],msg:"Berhasil update"};
              res.send(JSON.stringify(data));
              res.end();
            }
         });
       }
    });
  });
});
app.post(['/blog/delete'],(req, res) => {
  pool.getConnection(function(err, connection) {
    var token = "";
    if(req.body.token != undefined){
      token = req.body.token;
    }
    var id = "";
    if(req.body.id != undefined){
      id = req.body.id;
    }
    var sql_login = "select a.* from user a inner join user_token b on a.id=b.user_id where b.token=? and a.role=1";
    var query_data = connection.query(sql_login,[token], function (err, results, fields) {
       if (err) throw err;
       if(results.length == 0){
         connection.release();
         var data = {is_error:true,data:[],msg:"Token tidak valid"};
         res.send(JSON.stringify(data));
         res.end();
       }else{
         var sql_data = "delete from blog where id=?";
         var query_data = connection.query(sql_data,[id], function (err, results, fields) {
            if (err) {
              connection.release();
              var data = {is_error:true,data:[],msg:"Gagal hapus"};
              res.send(JSON.stringify(data));
              res.end();
            }else{
              connection.release();
              var data = {is_error:false,data:[],msg:"Berhasil hapus"};
              res.send(JSON.stringify(data));
              res.end();
            }
         });
       }
    });
  });
});
var server = app.listen(3002, () => {
  console.log('Server is running at port 3002');
});
