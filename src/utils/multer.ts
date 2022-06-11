import * as multer from 'multer'
import AppError from '../middleware/AppError'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/temp/my-uploads')
  },

  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1]

    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, `user-${Date.now()}.${ext}`)
  }
})

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startWith('image')) {
//     cb(null, true)
//   } else {
//     cb(new AppError(400, 'Please upload the image...'))
//   }
// }

const upload = multer({ storage: storage })

export const upladUserPhoto = upload.single('avatar')
