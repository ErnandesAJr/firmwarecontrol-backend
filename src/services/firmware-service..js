const firmwareRepository = require('../repositories/firmware-repository');
const http = require('../utils/http-constants');

class FirmwareService {

    /**
     * 
     * @param {*} archive 
     * @param {*} data 
     */
    async create(data,archive) {
        try {

            const { originalname: name, size, key, location: url = '' } = archive
            const { major, minor, patch, nameProject, compatibleBoard } = data
            
            if(Number.parseInt(major) && Number.parseInt(minor) && Number.parseInt(patch))
                throw({code:http.BAD_REQUEST, message: 'Version invalid' })

            if(size == 0)
                throw({code:http.BAD_REQUEST, message: 'Empty file' })
        
            const version = `v${major}_${minor}_${patch}`;
            const createdFirmware = await firmwareRepository.create({
                name,
                size,
                key,
                url,
                version,
                nameProject,
                compatibleBoard
           });

            return { code: http.CREATED, firmware: { firmware: createdFirmware } };

        } catch (error) {
            throw { code: error.code || http.INTERNAL_ERROR, message: error.message };
        }
    }

    /**
     * 
     * @param {*} id 
     */
    async findById(id) {
        try {
            const findFirmware = await firmwareRepository.findById(id)
            if (findFirmware) return { code: http.OK, firmware: { firmware: findFirmware } };
            throw error;

        } catch (error) {
            throw { code: error.code || http.INTERNAL_ERROR, message: error.message };
        }
    }

    async findAll() {
        try {
            const findFirmwares = await firmwareRepository.findAll()
            if (findFirmwares) return { code: http.OK, firmwares: { firmwares: findFirmwares } };
            throw error;

        } catch (error) {
            throw { code: error.code || http.INTERNAL_ERROR, message: error.message };
        }
    }

    /**
     * 
     * @param {*} id 
     */
    async delete(id) {
        try {
            const firmware = await firmwareRepository.findById(id);
            const firmwareDeleted = await firmwareRepository.delete(firmware);
            if (firmwareDeleted === 1) return { code: http.OK, message: "Firmware deleted" };
            throw error;
        } catch (error) {
            throw { code: error.code || http.INTERNAL_ERROR, message: error.message };
        }
    }

    /**
     * 
     * @param {*} board 
     */
    async findFirmwareByBoard(board) {
        try {
            const findFirmwares = await firmwareRepository.getAllFirmwareCompatibilityWithBoard(board)
            if (findFirmwares) return { code: http.OK, firmwares: { firmwares: findFirmwares } };
            throw error;

        } catch (error) {
            throw { code: error.code || http.INTERNAL_ERROR, message: error.message };
        }
    }

    /**
     * 
     * @param {*} project 
     */
    async findFirmwareByProject(project) {
        try {
            const findFirmwares = await firmwareRepository.findAllFirmwareByProject(project)
            if (findFirmwares) return { code: http.OK, firmwares: { firmwares: findFirmwares } };
            throw error;

        } catch (error) {
            throw { code: error.code || http.INTERNAL_ERROR, message: error.message };
        }
    }
    
    /**
     * 
     * @param {*} version 
     */
    async findFirmwareByVersion(version) {
        try {
            const findFirmwares = await firmwareRepository.findAllFirmwareByVersion(version)
            if (findFirmwares) return { code: http.OK, firmwares: { firmwares: findFirmwares } };
            throw error;

        } catch (error) {
            throw { code: error.code || http.INTERNAL_ERROR, message: error.message };
        }
    }

}

module.exports = new FirmwareService();