document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('userForm');
    const successMessage = document.getElementById('successMessage');
    const themeToggle = document.getElementById('themeToggle');

    userForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value.trim().toUpperCase();
        const dni = document.getElementById('dni').value.trim();
        const cbu = document.getElementById('cbu').value.trim();

        // Validación para que el campo de "Nombre y Apellido" solo acepte letras
        const nombreRegex = /^[A-Z\s]+$/;
        if (!nombreRegex.test(nombre)) {
            alert('Por favor, ingrese un nombre y apellido válido (solo letras en mayúsculas).');
            return;
        }

        // Validación para que el campo de "D.N.I." solo acepte 8 números
        if (!/^\d{8}$/.test(dni)) {
            alert('Por favor, ingrese un D.N.I. válido de 8 dígitos.');
            return;
        }

        // Validación para que el campo de "C.B.U." solo acepte 22 números
        if (!/^\d{22}$/.test(cbu)) {
            alert('Por favor, ingrese un C.B.U. válido de 22 dígitos.');
            return;
        }

        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, dni, cbu })
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);

            // Borrar los campos del formulario
            userForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️';
        } else {
            themeToggle.textContent = '🌙';
        }
    });
});
