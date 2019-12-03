'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
// window.onload = choosePic;
// if (typeof window === 'undefined') {
//   global.window = {}
// };

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
// var myPix = new Array("assets/Akuma.gif", "assets/Chun-li.gif", "assets/Dhalsim.gif", "assets/Guile.gif", "assests/Ken.gif", "assets/M.Bison.gif", "assets/Ryu.gif", "assets/Vega.gif");

// function choosePic() {
//   var randomNum = Math.floor(Math.random() * myPix.length);
//   document.getElementById("list-group-item").src = myPix[randomNum];
// }

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
