import multer from "multer";
//Multer
const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");