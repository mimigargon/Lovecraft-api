const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {ClodinaryStorage} = require('multer-storage-cloudinary');

const storage = new ClodinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'lovecraft',
        allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
    }
})

const upload = multer({storage});

module.exports = upload; 