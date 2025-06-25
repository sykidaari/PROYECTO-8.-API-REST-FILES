const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: (req) => {
      if (req.baseUrl.includes('products')) return 'petStore/products';
      if (req.baseUrl.includes('brands')) return 'petStore/brands';
    },
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
  }
});

const upload = multer({ storage });

module.exports = upload;
