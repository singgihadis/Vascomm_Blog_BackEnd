//use mysql database
const mysql = require('mysql2');
//konfigurasi koneksi
var db_config = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'vascomm_blog',
  dateStrings: 'date',
  connectionLimit: 10
};
var pool = mysql.createPool(db_config);
module.exports = pool;
