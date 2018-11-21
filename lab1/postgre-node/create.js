const pg = require('pg');
const pool = new pg.Pool({
user: 'sysadmin',
host: '127.0.0.1',
database: 'mywebstore',
password: 'postgres',
port: '5432'});

/*pool.query("CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(40) NOT NULL,telephone_number VARCHAR(40) NOT NULL)", (err, res) => {
console.log(err, res);
pool.end();
});*/
/*pool.query("CREATE TABLE orders(id SERIAL PRIMARY KEY, name VARCHAR(40) NOT NULL,availability BOOLEAN NOT NULL)", (err, res) => {
console.log(err, res);
pool.end();
});*/
/*pool.query("CREATE TABLE delivery(id SERIAL PRIMARY KEY, adres VARCHAR(40) NOT NULL,date TIMESTAMP NOT NULL)", (err, res) => {
console.log(err, res);
pool.end();
});*/
pool.query("ALTER TABLE orders ADD COLUMN id_delivery int ", (err, res) => {
console.log(err, res);
pool.end();
});