import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Add this line for destination
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname); //keep original name
  },
});

const upload = multer({ storage });

export default upload;
