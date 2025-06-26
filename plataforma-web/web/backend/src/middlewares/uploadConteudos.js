const multer = require('multer');
const path = require('path');
const fs = require('fs');

const BASE_DIR = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const cursoId = req.body.id_curso || 'geral';
        const aulaId = req.body.id_aula || 'aula0'
        const uploadPath = path.join(BASE_DIR, `curso${cursoId}`, `aula${aulaId}`);

        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const filename = `conteudo-${Date.now()}${ext}`;
        cb(null, filename);
    }
});

const allowed = [
    'image/jpeg', 'image/png', 
    'application/pdf', 
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel.sheet.macroEnabled.12',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'];

const fileFilter = (req, file, cb) => {
    if(!allowed.includes(file.mimetype)){
        return cb(
            new Error('Só são permitidos PDF, imagens (JPG/PNG), Word (.doc/.docx) e Excel (.xls/.xlsx).'),
            false
        );
    }
    cb(null, true);
};

const limits = { fileSize: 100 * 1024 * 1024 };

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;