const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const ensureDirectoryExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Configure storage for profile photos
const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/profiles/';
        ensureDirectoryExists(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Configure storage for project images
const projectStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/projects/';
        ensureDirectoryExists(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'project-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Configure storage for CV files
const cvStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/cvs/';
        ensureDirectoryExists(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'cv-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filters
const imageFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
    }
};

const cvFilter = (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF and Word documents are allowed'));
    }
};

// Create multer instances
const uploadProfile = multer({
    storage: profileStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: imageFilter
});

const uploadProject = multer({
    storage: projectStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: imageFilter
});

const uploadCV = multer({
    storage: cvStorage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: cvFilter
});

// Export single file upload middleware
const uploadSingle = (fieldName) => {
    return (req, res, next) => {
        const upload = uploadProfile.single(fieldName);
        upload(req, res, (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }
            next();
        });
    };
};

module.exports = {
    uploadProfile,
    uploadProject,
    uploadCV,
    uploadSingle,
    // Convenience methods
    singleProfile: uploadProfile.single.bind(uploadProfile),
    singleProject: uploadProject.single.bind(uploadProject),
    singleCV: uploadCV.single.bind(uploadCV)
};