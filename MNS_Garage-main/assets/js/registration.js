document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêcher le formulaire de se soumettre normalement

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Envoyer la requête POST au back-end pour l'authentification
        fetch('http://localhost:8080/api/connexion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(response => response.json())
        .then(data => {
            // Traitement de la réponse du back-end
            console.log(data);
        })
        .catch(error => {
            console.error('Erreur lors de la requête:', error);
        });
    });

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêcher le formulaire de se soumettre normalement

        // Récupérer les valeurs du formulaire
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const phoneNumber = document.getElementById('signup-phone').value;
        const licensePlate = document.getElementById('signup-license').value;

        // Envoyer la requête POST au back-end pour l'inscription
        fetch('http://localhost:8080/api/inscription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password, phoneNumber: phoneNumber, licensePlate: licensePlate })
        })
        .then(response => response.json())
        .then(data => {
            // Traitement de la réponse du back-end
            console.log(data);
        })
        .catch(error => {
            console.error('Erreur lors de la requête:', error);
        });
    });
});
