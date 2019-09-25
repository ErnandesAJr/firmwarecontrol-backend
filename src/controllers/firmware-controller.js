const firmwareService = require('../services/firmware-service.');

class FirmwareController {

    static create(req, res) {
        return firmwareService.create(req.body, req.file)
            .then(result => {
                res.status(result.code).json(result.firmware);
            }).catch(error => res.status(error.code).json(error.message));
    }

    static getById(req, res) {
        return firmwareService.findById(req.params.id)
            .then(result => {
                res.status(result.code).json(result.firmware);
            }).catch(error => res.status(error.code).json(error.message));
    }

    static getAll(req, res) {
        return firmwareService.findAll()
            .then(result => {
                res.status(result.code).json(result.firmwares);
            }).catch(error => res.status(error.code).json(error.message));
    }

    static delete(req, res) {
        return firmwareService.delete(req.params.id)
            .then(result => {
                res.status(result.code).json(result.message);
            }).catch(error => res.status(error.code).json(error.message));
    }
    
    static getAllFirmwareCompatibilityWithBoard(req, res) {
        return firmwareService.findFirmwareByBoard(req.params.board)
            .then(result => {
                res.status(result.code).json(result.firmwares);
            }).catch(error => res.status(error.code).json(error.message));
    }

    static getAllFirmwareByProject(req, res) {
        return firmwareService.findFirmwareByProject(req.params.project)
            .then(result => {
                res.status(result.code).json(result.firmwares);
            }).catch(error => res.status(error.code).json(error.message));
    }

    static getAllFirmwareByVersion(req, res) {
        return firmwareService.findFirmwareByVersion(req.params.version)
            .then(result => {
                res.status(result.code).json(result.firmwares);
            }).catch(error => res.status(error.code).json(error.message));
    }

}

module.exports = FirmwareController;