const firmwareCtrl = require('../controllers/firmware-controller');

module.exports = (multer ,multerConfig, router) => {

    router.post('/firmware', function (req, res, next) {
        multer(multerConfig).single('file')(req, res, (function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json('A Multer error occurred when uploading')
            } else if (err) {
                return res.status(500).json('Invalid Archive')
            }
            next()
        }), next)
    }, firmwareCtrl.create);

    router.get('/firmware', firmwareCtrl.getAll);
    router.get('/firmware/:id', firmwareCtrl.getById);
    router.get('/firmware/project/:project', firmwareCtrl.getAllFirmwareByProject);
    router.get('/firmware/version/:version', firmwareCtrl.getAllFirmwareByVersion);
    router.get('/firmware/board/:board', firmwareCtrl.getAllFirmwareCompatibilityWithBoard);
    router.delete('/firmware/:id', firmwareCtrl.delete);

};