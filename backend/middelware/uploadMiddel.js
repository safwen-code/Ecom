const multer = require('multer')
const path = require('path')

//set storage ongine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads') // folder to save image
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`) //unique name
  },
})

//file validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  )
  const mimetype = allowedTypes.test(file.mimetype)
  if (extname && mimetype) {
    cb(null, true)
  } else {
    cb('Only image are allowed')
  }
}
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter,
})

module.exports = upload
