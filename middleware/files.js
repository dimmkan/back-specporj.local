const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'images')
    },
    filename(req, file, callback) {
        callback(null, new Date().toISOString().replace(/:/g, '-') + '_' + file.originalname)
    }
})

const allowedTypes = ['image/png']

const fileFilter = (req, file, callback) => {
    if (allowedTypes.includes(file.mimetype)) {
        callback(null, true)
    }else {
        callback(null, false)
    }
}

module.exports = multer({
    storage,
    fileFilter
})