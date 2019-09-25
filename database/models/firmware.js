const fs = require('fs')
const path = require('path')
const {promisify} = require('util')
const aws = require('aws-sdk')
const s3 = new aws.S3();


module.exports = (sequelize, Sequelize) => {
    const Firmware = sequelize.define('Firmware', {
        name: {
            type: Sequelize.STRING,
            required: true,
            allowNull:false,
            unique:true
        },

        size: {
            type: Sequelize.FLOAT
        },

        key: {
            type: Sequelize.STRING
        },

        url: {
            type: Sequelize.STRING
        },

        version: {
            type: Sequelize.STRING,
            required: true,
            allowNull:false,
            notEmpty: true
        },

        nameProject: {
            type: Sequelize.STRING,
            required: true,
            allowNull:false,
            notEmpty: true
        },

        compatibleBoard: {
            type: Sequelize.STRING,
            required: true,
            allowNull:false,
            notEmpty: true
        }
    },
        {
            timestamps: true,
            underscored: true,
            hooks:{
                beforeCreate: (firmware, options) => {
                    if (!firmware.dataValues.url) {
                        firmware.dataValues.url = `${process.env.APP_URL}/files/${firmware.dataValues.key}`
                    }

                    const nameProjectModify = firmware.dataValues.nameProject.replace(" ", "_") + '_';                                        
                    const nameArchive = firmware.dataValues.name.substring(0,firmware.dataValues.name.lastIndexOf('.'))

                    if (  nameArchive !== `${nameProjectModify}${firmware.dataValues.version}`) {
                        throw new Error("The file name must be project_name_v0_0_1.bin")
                    }
                                        
                },
                beforeBulkDestroy: (({where, individualHooks}) => {               
                    if (process.env.STORAGE_TYPE === 's3') {
                        return s3.deleteObject({
                            Bucket: process.env.AWS_BUCKET_NAME,
                            Key: where.key
                        }).promise()
                    } else {
                        return promisify(fs.unlink)(path.resolve(__dirname,"..", "..", "tmp", "uploads", where.key))
                    }
                  })
            }
        });
        
    return Firmware;
}
