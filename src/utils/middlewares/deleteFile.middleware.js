const cloudinary = require('cloudinary').v2;

const deleteFile = (imgUrl) => {
    const imgSplited = imgUrl.split('/');
    const nameSplited = imgSplited[imgSplited.length -1].split('.');
    const folderSplited = imgSplited[imgSplited.length -2];
    const imgToDelete = `${folderSplited}/${nameSplited[0]}`;
    cloudinary.uploader.destroy(imgToDelete, () => (
        console.log('Image deleted in cloudinary')
    ));
}

module.exports = deleteFile;