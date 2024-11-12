const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Ruta para manejar el formulario
app.post('/submit', (req, res) => {
    const { nombre, dni, cbu } = req.body;

    // Validación para que el campo de "Nombre y Apellido" solo acepte letras en mayúsculas
    const nombreRegex = /^[A-Z\s]+$/;
    if (!nombreRegex.test(nombre)) {
        return res.status(400).send('Nombre y Apellido inválido (solo letras en mayúsculas).');
    }

    // Validación para que el campo de "D.N.I." solo acepte 8 números
    if (!/^\d{8}$/.test(dni)) {
        return res.status(400).send('D.N.I. inválido (8 dígitos).');
    }

    // Validación para que el campo de "C.B.U." solo acepte 22 números
    if (!/^\d{22}$/.test(cbu)) {
        return res.status(400).send('C.B.U. inválido (22 dígitos).');
    }

    const data = `Nombre y Apellido: ${nombre}, D.N.I.: ${dni}, C.B.U.: ${cbu}\n`;
    
    // Crear la carpeta 'datos' si no existe
    const dir = path.join(__dirname, 'datos');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    // Escribir los datos en un archivo dentro de la carpeta 'datos'
    const filePath = path.join(dir, 'datos.txt');
    fs.appendFile(filePath, data, (err) => {
        if (err) throw err;
        console.log('Datos guardados en datos/datos.txt');
    });

    res.send('Datos recibidos');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Ruta para manejar el formulario
app.post('/submit', (req, res) => {
    const { nombre, dni, cbu } = req.body;

    // Validación para que el campo de "Nombre y Apellido" solo acepte letras en mayúsculas
    const nombreRegex = /^[A-Z\s]+$/;
    if (!nombreRegex.test(nombre)) {
        return res.status(400).send('Nombre y Apellido inválido (solo letras en mayúsculas).');
    }

    // Validación para que el campo de "D.N.I." solo acepte 8 números
    if (!/^\d{8}$/.test(dni)) {
        return res.status(400).send('D.N.I. inválido (8 dígitos).');
    }

    // Validación para que el campo de "C.B.U." solo acepte 22 números
    if (!/^\d{22}$/.test(cbu)) {
        return res.status(400).send('C.B.U. inválido (22 dígitos).');
    }

    const data = `Nombre y Apellido: ${nombre}, D.N.I.: ${dni}, C.B.U.: ${cbu}\n`;
    
    // Crear la carpeta 'datos' si no existe
    const dir = path.join(__dirname, 'datos');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    // Leer el archivo para verificar duplicados
    const filePath = path.join(dir, 'datos.txt');
    fs.readFile(filePath, 'utf8', (err, fileData) => {
        if (err && err.code !== 'ENOENT') throw err;

        if (fileData && fileData.includes(data)) {
            return res.status(400).send('Datos duplicados.');
        }

        // Escribir los datos en un archivo dentro de la carpeta 'datos'
        fs.appendFile(filePath, data, (err) => {
            if (err) throw err;
            console.log('Datos guardados en datos/datos.txt');
            res.send('Datos recibidos');
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
