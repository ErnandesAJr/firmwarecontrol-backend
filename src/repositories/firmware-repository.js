const { Firmware } = require('../../database/models');
const stack = require('../utils/error-handler');

class FirmwareRepository {

    /**
     * 
     * @param {*} newFirmware 
     */
    create(newFirmware) {
        return Firmware.create(newFirmware)
            .then(firmwareCreated => {
                return firmwareCreated
            }).catch(error => {
                throw stack.createError(error)
            });
    }

    /**
     * 
     * @param {*} id 
     */
    findById(id) {
        return Firmware.findOne({
            where: {
                id:id
            }
        })
            .then(firmware => {
                if (!firmware) throw stack.notFoundError(id);
                return firmware;
            }).catch(error => {
                throw stack.findError(error)
            });
    }

    findAll() {
        return Firmware.findAll({
        })
            .then(firmwares => {
                if (firmwares.length === 0) {
                    throw stack.notFoundError()
                } else {
                    return firmwares;
                }

            }).catch(error => {
                throw stack.findError(error)
            });
    }

    /**
     * 
     * @param {*} id 
     */
    delete(firmware) {
        return Firmware.destroy({
            where: {
                id: firmware.id,
                key:firmware.key
            }
        })
            .then((rowsDeleted, deletedUser) => {
                if (!rowsDeleted) throw stack.notFoundError();
                return rowsDeleted;
            }).catch(error => {
                throw stack.findError(error)
            });
    }


    /**
     * 
     * @param {*} compatibleBoard 
     */
    getAllFirmwareCompatibilityWithBoard(compatibleBoard) {
        return Firmware.findAll({
                where: {
                    compatibleBoard: compatibleBoard
                }
        })
            .then(firmwares => {
                if (firmwares.length === 0) throw stack.notFoundError();
                return firmwares;
            }).catch(error => {
                throw stack.findError(error)
            });
    }

    /**
     * 
     * @param {*} project 
     */
    findAllFirmwareByProject(project) {
        return Firmware.findAll({
                where: {
                    nameProject: project
                }
        })
            .then(firmwares => {
                if (firmwares.length === 0) throw stack.notFoundError();
                return firmwares;
            }).catch(error => {
                throw stack.findError(error)
            });
    }

    /**
     * 
     * @param {*} version 
     */
    findAllFirmwareByVersion(version) {
        return Firmware.findAll({
                where: {
                    version: version
                }
        })
            .then(firmwares => {
                if (firmwares.length === 0) throw stack.notFoundError();
                return firmwares;
            }).catch(error => {
                throw stack.findError(error)
            });
    }

}

module.exports = new FirmwareRepository();