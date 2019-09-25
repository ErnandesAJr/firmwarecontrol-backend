const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require('../../config/database');

const db = {};

if (process.env.NODE_ENV === 'production'){
    const sequelize = require('sequelize-heroku').connect(require('sequelize'));

    if (sequelize) {
        sequelize.authenticate().then(function () {
            var config = sequelize.connectionManager.config;
            console.log('sequelize-heroku: Connected to ' + config.host + ' as ' + config.username + '.');

        }).catch(function (err) {
            var config = sequelize.connectionManager.config;
            console.log('Sequelize: Error connecting ' + config.host + ' as ' + config.user + ': ' + err);
        });
    } else {
        console.log('No environnement variable found.');
    }
}else{
    const sequelize = new Sequelize(config);
}



fs.readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.initialize = (env, config) => {
    if (env === 'development') db.sequelize.sync({ force: config.forceDelete })
        .then(() => {
            if (config.delete) {
                // if necessary initialize something in the database
            }
        });
}

module.exports = db;
