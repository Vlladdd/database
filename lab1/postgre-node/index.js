let readline = require('readline');
let math = require('math');
var random_name = require('node-random-name');
var chance = require('chance').Chance();
var Moniker = require('moniker');
var names = Moniker.generator([Moniker.noun]);
const validFields = ['id', 'title', 'developer', 'engine', 'genre', 'mode', 'release','price','version'];



const pg = require('pg');
const pool = new pg.Pool({
user: 'sysadmin',
host: '127.0.0.1',
database: 'mywebstore',
password: 'postgres',
port: '5432'});




const getAll = async() => {
    let table = await ask('Choose table: \n\
    1.users \n\
    2.orders \n\
    3.delivery \n\ ');
        if(table==1)
        {
            try {
            let result =  await pool.query("SELECT * FROM users");
            console.log(result.rows);
            } catch (error){
                console.error(error.message);
            } 
        }
        if(table==2)
        {
            try {
            let result =  await pool.query("SELECT * FROM orders");
            console.log(result.rows);
            } catch (error){
                console.error(error.message);
            } 
        }
         if(table==3)
        {
            try {
            let result =  await pool.query("SELECT * FROM delivery");
            console.log(result.rows);
            } catch (error){
                console.error(error.message);
            } 
        }
        if(table !=1 && table !=2 && table !=3){
    console.log("Wrong Input");
}
};

const create = async() => {
    let table = await ask('Choose table: \n\
    1.users \n\
    2.orders \n\
    3.delivery \n\ ');
    let a=0;
    let d=0;
    if(table==1 || table==2 || table==3){
    try {
           if(table==1)
            var result = await pool.query("SELECT COUNT(*) FROM users");
            if(table==2)
            var result = await pool.query("SELECT COUNT(*) FROM orders");
            if(table==3)
            var result = await pool.query("SELECT COUNT(*) FROM delivery");
            d=result.rows[0].count;
        }catch (error){
                    console.error(error.message);
    }
    if(d>0){
        if(table==1)
        var y=await pool.query("SELECT max(id_user) FROM users");
        if(table==2)
        var y=await pool.query("SELECT max(id_order) FROM orders");
        if(table==3)
        var y=await pool.query("SELECT max(id) FROM delivery");
        a=y.rows[0].max+1;
    }
    let b="";
    let c="";
    let k="";
    let type=0;
    while(type != 1 && type !=2){
    type = await ask('Choose type: \n\
    1.Random \n\
    2.Your own \n\ ');
    if(type==1 && table==1){
    b=random_name();
    c=chance.phone();
    k=chance.integer({ min: 0, max: 100 })
}
    if(type==2 && table==1)
{
    b=await ask('Enter name:');
    c=await ask('Enter telephone number:');
    k=await ask('Enter id of order:');
}
    if(type==1 && table==2){
    b=names.choose();
    c=Math.random() >= 0.5;
    k=chance.integer({ min: 0, max: 100 })
}
    if(type==2 && table==2)
{
    b=await ask('Enter name:');
    c=await ask('Enter availability:');
    k=await ask('Enter id of delivery:');
}
    if(type==1 && table==3){
    b=chance.address();
    c=chance.date();
}
    if(type==2 && table==3)
{
    b=await ask('Enter adress:');
    c=await ask('Enter date:');
}
if(type!=1 && type!=2){
    console.log("Wrong type!");
}
    }
   try {
       if(table==1)
    await pool.query("INSERT INTO users(id_user,name,telephone_number,id_order) VALUES($1,$2,$3,$4)",[a,b,c,k]);
        if(table==2)
    await pool.query("INSERT INTO orders(id_order,name,availability,id_delivery) VALUES($1,$2,$3)",[a,b,c,k]);
        if(table==3)
    await pool.query("INSERT INTO delivery(id_delivery,adres,date) VALUES($1,$2,$3)",[a,b,c]);
} catch (error){
       console.error(error.message);
    }
}
else
{
    console.log("wrong input");
}
};

const deletedata = async() => {
    let table = await ask('Choose table: \n\
    1.users \n\
    2.orders \n\
    3.delivery \n\ ');
    if(table==1 || table==2 || table==3){
    let id = await ask('Enter id of user: ');
    try {
        if(table==1)
        await pool.query("DELETE FROM users WHERE id=$1",[id]);
        if(table==2)
        await pool.query("DELETE FROM orders WHERE id=$1",[id]);
        if(table==3)
        await pool.query("DELETE FROM delivery WHERE id=$1",[id]);
} catch (error){
        console.error(error.message);
    }
        }
        else{
    console.log("Wrong input!");
}
};

const update = async() => {
     let table = await ask('Choose table: \n\
    1.users \n\
    2.orders \n\
    3.delivery \n\ ');
    if(table==1 || table==2 || table==3){
    try {
        if(table==1) 
        {
             let choice = await ask('Choose column: \n\
    1.name \n\
    2.telephone_number \n\
    3.id_order \n\ ');
    let id = await ask('Enter id : ');
    let data = await ask('Enter data:');
    if(choice==1)
        await pool.query("UPDATE users SET name = $1 WHERE id_user =$2",[data,id]);
    if(choice==2)
        await pool.query("UPDATE users SET telephone_number = $1 WHERE id_user =$2",[data,id]);
    }
    if(choice==3)
        await pool.query("UPDATE id_order SET telephone_number = $1 WHERE id_user =$2",[data,id]);
        if(table==2) 
        {
             let choice = await ask('Choose column: \n\
    1.name \n\
    2.availability \n\
    3.id_delivery \n\ ');
    let id = await ask('Enter id : ');
    let data = await ask('Enter data:');
    if(choice==1)
        await pool.query("UPDATE orders SET name = $1 WHERE id_order =$2",[data,id]);
    if(choice==2)
        await pool.query("UPDATE orders SET availability = $1 WHERE id_order =$2",[data,id]);
    if(choice==3)
        await pool.query("UPDATE orders SET id_delivery = $1 WHERE id_user =$2",[data,id]);
        }
        if(table==3) 
        {
             let choice = await ask('Choose column: \n\
    1.adress \n\
    2.date \n\ ');
    let id = await ask('Enter id : ');
    let data = await ask('Enter data:');
    if(choice==1)
        await pool.query("UPDATE delivery SET adress = $1 WHERE id =$2",[data,id]);
    if(choice==2)
        await pool.query("UPDATE delivery SET date = $1 WHERE id =$2",[data,id]);
        }
} catch (error){
        console.error(error.message);
    }
            }
            else
            {
                console.log("Wrong input");
            }        
};


const search1 = async() => {
    {
        let choice = await ask('Choose availability: \n\
    1.true \n\
    2.false \n\ ');
    let a=2;
    if(choice==1)
    a=true;
    if(choice==2)
    a=false;
    if(a==1 || a==0){
            try {
            let result =  await pool.query(" SELECT users.name,orders.id_order,orders.availability FROM users INNER JOIN orders USING (id_order) WHERE availability = $1 ",[a]);
            console.log(result.rows);
            } catch (error){
                console.error(error.message);
            } 
        }
                else
        {
            console.log("Wrong input");
        }
    }
};
const search2 = async() => {
    {
           let table = await ask('Choose table: \n\
    1.users \n\
    2.orders \n\
    3.delivery \n\ ');
    let type = await ask('Choose type: \n\
    1.word \n\
    2.phrase \n\ ');
        if(type==1)
        var choice = await ask('Type word:');
        if(type==2)
        var choice = await ask('Type phrase:');
    if((table==1 || table==2 || table==3)&&(type==1 || type==2)){
            try {
           // let result =  await pool.query(" SELECT id_user, ts_headline(users.name) FROM users,to_tsquery('vlad')");
           if(table==1 && type==1)
           var result =  await pool.query("SELECT id_user,ts_headline(name,to_tsquery($1)) AS name,telephone_number,id_order FROM users WHERE to_tsvector(name) @@ to_tsquery($1)",[choice]);
           if(table==1 && type==2){
           choice=choice.replace( / /g, "<->" );
           var result =  await pool.query("SELECT id_user,ts_headline(name,to_tsquery($1)) AS name,telephone_number,id_order FROM users WHERE to_tsvector(name) @@ to_tsquery($1)",[choice]);
           }
           if(table==2 && type==1)
           var result =  await pool.query("SELECT id_order,ts_headline(name,to_tsquery($1)) AS name,availability,id_delivery FROM orders WHERE to_tsvector(name) @@ to_tsquery($1)",[choice]);
           if(table==2 && type==2){
            choice=choice.replace( / /g, "<->" );
           var result =  await pool.query("SELECT id_order,ts_headline(name,to_tsquery($1)) AS name,availability,id_delivery  FROM orders WHERE to_tsvector(name) @@ to_tsquery($1)",[choice]);
           }
           if(table==3 && type==1)
           var result =  await pool.query("SELECT id_delivery,ts_headline(adres,to_tsquery($1)) AS adres,date FROM delivery WHERE to_tsvector(adres) @@ to_tsquery($1)",[choice]);
           if(table==3 && type==2){
            choice=choice.replace( / /g, "<->" );
           var result =  await pool.query("SELECT id_delivery,ts_headline(adres,to_tsquery($1)) AS adres,date FROM delivery WHERE to_tsvector(adres) @@ to_tsquery($1)",[choice]);
           }
            console.log(result.rows);
            } catch (error){
                console.error(error.message);
            } 
        }
        else
        {
            console.log("Wrong input");
        }
    }
};

const exit = async() => {
    process.exit(); 
    pool.end();
};
const commands = [ getAll,create,deletedata,update,search1,search2,exit];

const start = async() => {
    consoleMenu();
    let command = await ask('Choose an option: ');
    if (parseInt(command) > 0 && parseInt(command) < 8) {
        await commands[(command - 1)]();
    } else {
        console.log('\nInvalid input!\n');
    }
    await ask('\nPress any key to continue: ');
    clear();
    start();
};


consoleMenu = () => {
    console.log('    1.getAll.\n\
    2.create.\n\
    3.deletedata.\n\
    4.update \n\
    5.search1 \n\
    6.search2 \n\
    7.exit.\n\ ');
};



clear = () => process.stdout.write('\033c');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (message) => new Promise(resolve =>
    rl.question(message, answer => resolve(answer)))



start();