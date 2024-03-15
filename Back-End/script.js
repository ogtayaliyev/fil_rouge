document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Récupération des valeurs du formulaire
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var role = document.getElementById('role').value;

    // Validation des données
    if (username.trim() === '' || password.trim() === '' || role === '') {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    // Validation réussie, affichage des données
    alert('Username: ' + username + '\nPassword: ' + password + '\nRole: ' + role);
});
