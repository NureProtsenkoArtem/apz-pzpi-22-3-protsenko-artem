require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const INSTALLER_URL = process.env.INSTALLER_URL;
const HOST = process.env.HOST || '0.0.0.0';
const APK_URL = process.env.APK_URL;

app.use(cors());

app.get('/download', (req, res) => {
    if (!INSTALLER_URL) {
        return res.status(500).send("INSTALLER_URL не задано в .env файлі");
    }
    res.redirect(INSTALLER_URL);
});

app.get("/download-apk", (req, res) => {
    res.redirect(APK_URL);
});


app.listen(PORT, HOST, () => {
    console.log(`Сервер запущено на http://${HOST}:${PORT}`);
});
