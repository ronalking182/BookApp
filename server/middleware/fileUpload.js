const multer = require('multer');

MIME_TYPES_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
}

const fileUpload = multer({
    limits:500000,
    storage: multer.diskStorage({
        destination:(req, file, cb)=>{
            cb(null, 'upload/image')
        },
        filename:(req, file, cb)=>{
            const ext = MIME_TYPES_MAP[file.mimetype]
            cb(null, `${Date.now()} - ${math.floor(Math.random() * 1000000)} - ${ext}`)
        },
        fileFilter:(req, file, cb)=>{
            const isValid = !!MIME_TYPES_MAP[file.mimetype]
            const error = isValid ? null: new Error("invalid file type")
            cb(error, isValid)
        },
    })
})

module.exports = fileUpload