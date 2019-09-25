const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const path = require('path')
const routes = require('./routes/routes');
const database = require('../database/models/index');

class App {

    constructor() {
        this.database = database;
        this.server = express();
        this.useMiddlewares();
    }

    useMiddlewares() {
        this.server.use(cors());
        this.server.use(logger('dev'));
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: true }));
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(routes);
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
        );
    }

}

module.exports = new App();