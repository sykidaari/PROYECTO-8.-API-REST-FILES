const cloudinary = require('cloudinary').v2;

const deleteCloudinaryImg = (url) => {
  const splitImg = url.split('/');

  const folderName = splitImg.at(-2);
  const fileName = splitImg.at(-1).split('.')[0];

  cloudinary.uploader.destroy(`${folderName}/${fileName}`, () => {
    console.log('img deleted in CLoudinary');
  });
};

module.exports = deleteCloudinaryImg;
