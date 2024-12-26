const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = `image-${Date.now()}-${file.originalname}`;
        callback(null, uniqueSuffix);
    },
});

// File type filter
const fileFilter = (req, file, callback) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        console.error("Invalid file type:", file.mimetype);
        callback(new Error("Only .jpeg, .jpg, or .png files are allowed!"), false);
    }
};

const multerMiddleware = multer({
    storage,
    fileFilter,
});

module.exports = multerMiddleware;
    