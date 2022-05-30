const express = require('express');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'upload/' });
const type = upload.single("upImage");

app.use(cors({
    origin: "*"
}));
app.use(express.urlencoded({ extended: false }));
app.use(type);

app.use('/prediction', require('./routes/api/predict'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));