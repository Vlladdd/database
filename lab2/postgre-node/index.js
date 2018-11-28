let readline = require('readline');
const Sequelize = require('sequelize');
let math = require('math');
var random_name = require('node-random-name');
var chance = require('chance').Chance();
var Moniker = require('moniker');
var names = Moniker.generator([Moniker.noun]);
const validFields = ['id', 'title', 'developer', 'engine', 'genre', 'mode', 'release','price','version'];



/*const pg = require('pg');
const pool = new pg.Pool({
user: 'sysadmin',
host: '127.0.0.1',
database: 'mywebstore',
password: 'postgres',
port: '5432'});*/


const sequelize = new Sequelize({
  database: 'mywebstore',
  username: 'sysadmin',
  password: 'postgres',
  dialect: 'postgres' ,
  host: '127.0.0.1',
  port: '5432' ,
  define: {
        timestamps: false
    }
});

/*const func = async() => {
await sequelize.query('CREATE OR REPLACE FUNCTION log_name_changes() \n'+
  'RETURNS trigger AS \n'+
'$BODY$ \n'+
'BEGIN \n'+
 'IF NEW.name <> OLD.name THEN \n'+
 'INSERT INTO users1(id_user,name,telephone_number,id_order) \n'+
 'VALUES(default,OLD.name,OLD.telephone_number,OLD.id_order); \n'+
 'END IF; \n'+
 'RETURN NEW; \n'+
'END; \n'+
'$BODY$ LANGUAGE plpgsql;\n')
}
func();
	/*sequelize.query('DROP TRIGGER IF EXISTS name_changes\n'+
  'ON users;\n');*/
/*sequelize.query('DROP TRIGGER IF EXISTS name_changes\n'+
  'ON users;\n'+
  'CREATE TRIGGER name_changes \n'+
  'AFTER UPDATE \n'+
  'ON users \n'+
  'FOR EACH ROW \n'+
  'EXECUTE PROCEDURE log_name_changes(); \n')	*/

const Users = sequelize.define('users', {
  id_user: { type: Sequelize.INTEGER, autoIncrement: true ,primaryKey: true},
  name: { type:Sequelize.STRING, notNull:true},
  telephone_number: { type:Sequelize.STRING, notNull:true},
  id_order:{type:Sequelize.INTEGER},
})

const Users1 = sequelize.define('users1', {
  id_user: { type: Sequelize.INTEGER, autoIncrement: true ,primaryKey: true},
  name: { type:Sequelize.STRING, notNull:true},
  telephone_number: { type:Sequelize.STRING, notNull:true},
  id_order:{type:Sequelize.INTEGER},
},{freezeTableName: true})

const Orders = sequelize.define('orders', {
  id_order: { type: Sequelize.INTEGER, autoIncrement: true ,primaryKey: true},
  name: { type:Sequelize.STRING, notNull:true},
  availability: { type:Sequelize.BOOLEAN, notNull:true},
  id_delivery: {type:Sequelize.INTEGER}
})

const Delivery = sequelize.define('delivery', {
  id_delivery: { type: Sequelize.INTEGER, autoIncrement: true ,primaryKey: true},
  adres: { type:Sequelize.STRING, notNull:true},
  date: { type:Sequelize.DATE, notNull:true},
},{freezeTableName: true})


const getAll = async() => {
    let table = await ask('Choose table: \n\
    1.users \n\
    2.orders \n\
    3.delivery \n\
    4.users1 \n\ ');
        if(table==1)
        {
            try {
            let result =  await Users.findAll({raw:true});
            console.log(result);
            } catch (error){
                console.error(error.message);
            } 
        }
        if(table==2)
        {
            try {
            let result =  await Orders.findAll({raw:true});
            console.log(result);
            } catch (error){
                console.error(error.message);
            } 
        }
         if(table==3)
        {
            try {
            let result =  await Delivery.findAll({raw:true});
            console.log(result);
            } catch (error){
                console.error(error.message);
            } 
        }
        if(table==4)
        {
            try {
            let result =  await Users1.findAll({raw:true});
            console.log(result);
            } catch (error){
                console.error(error.message);
            } 
        }
        if(table !=1 && table !=2 && table !=3 && table !=4){
    console.log("Wrong Input");
}
};

const create = async() => {
    let table = await ask('Choose table: \n\
    1.users \n\
    2.orders \n\
    3.delivery \n\ ');
    if(table==1 || table==2 || table==3){
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
    await Users.create({name: b, telephone_number: c,id_order: k })
        if(table==2)
    await Orders.create({name: b, availability: c,id_delivery: k })
        if(table==3)
    await Delivery.create({adres: b, date: c})
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
    let id = await ask('Enter id: ');
    try {
        if(table==1){
        await Users.destroy({
            where: {
             id_user: id
             }
            });
        }
        if(table==2)
        {
        await Orders.destroy({
            where: {
             id_order: id
             }
            });
        }
        if(table==3)
        {
        await Delivery.destroy({
            where: {
             id_delivery: id
             }
            });
        }
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
    if(choice==1){
        await Users.update({
            name: data},
            {where: {
            id_user: id
         }
        });
    }
    if(choice==2){
        await Users.update({
            telephone_number: data},
            {where: {
            id_user: id
         }
        });
    }
    if(choice==3){
        await Users.update({
            id_order: data},
            {where: {
            id_user: id
         }
        });
     }
    }
        if(table==2) 
        {
             let choice = await ask('Choose column: \n\
    1.name \n\
    2.availability \n\
    3.id_delivery \n\ ');
    let id = await ask('Enter id : ');
    let data = await ask('Enter data:');
    if(choice==1){
        await Orders.update({
            name: data },
            {where: {
            id_order: id
         }
        });
    }
    if(choice==2){
        await Orders.update({
            availability: data},
            {where: {
            id_order: id
         }
        });
    }
    if(choice==3){
        await Orders.update({
            id_delivery: data},
            {where: {
            id_order: id
         }
        });
     }
        }
        if(table==3) 
        {
             let choice = await ask('Choose column: \n\
    1.adress \n\
    2.date \n\ ');
    let id = await ask('Enter id : ');
    let data = await ask('Enter data:');
    if(choice==1){
        await Delivery.update({
            adres: data},
            {where: {
            id_delivery: id
         }
        });
    }
    if(choice==2){
        await Delivery.update({
            date: data},
            {where: {
            id_delivery: id
         }
        });
    }
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
                Users.belongsTo(Orders,{foreignKey:'id_order'});
                Orders.hasOne(Users,{foreignKey:'id_order'});
               await sequelize.sync();
            let result =  await Users.findAll({ where: { '$order.availability$': a } ,include:[ Orders] ,raw:true})
            console.log(result);
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
           var result =  await Users.findAll({ where: { name: {like:'%'+choice+'%'} },raw:true})
           if(table==1 && type==2)
           var result =  await Users.findAll({ where: { name: choice},raw:true})
           if(table==2 && type==1)
           var result =  await Orders.findAll({ where: { name: {like:'%'+choice+'%'} },raw:true})
           if(table==2 && type==2)
           var result =  await Orders.findAll({ where: { name: choice},raw:true})
           if(table==3 && type==1)
           var result =  await Delivery.findAll({ where: { adres: {like:'%'+choice+'%'} },raw:true})
           if(table==3 && type==2)
           var result =  await Delivery.findAll({ where: { adres: choice},raw:true})
            console.log(result);
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