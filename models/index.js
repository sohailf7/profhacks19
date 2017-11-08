"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(path.join(__dirname, '..', 'package.json'))[env];

/**
* Database connection string
*/

var uristring =
process.env.DATABASE_URL ||
'postgres://hoot:hoot@localhost/prof'; //TODO: Change this string

/**
* Initialize sequelize
*/

if (uristring) {
  var sequelize = new Sequelize(uristring, {
    dialect: "postgres",
    port: "5432"
  });
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

/**
* Generate models for use.
*/

var db = {};

// Search models directory for each js file and import model into db hash table.
fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

/**
* Reference sequelize object and Sequelize package to export with db models.
*
* TODO: Rename db.sequelize and db.Sequelize
*/

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
