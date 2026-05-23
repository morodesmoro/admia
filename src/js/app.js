// Logique Backend simulée via LocalStorage
let currentUser = null;
const MESSAGE_LIMIT = 8;
const LOCK_TIME_MS = 10 * 60 * 60 * 1000; // 10 Heures en millisecondes

// Réponses administratives réalistes simulées
const adminResponses = [
    "J'ai préparé la trame de votre document administratif. Il inclut les clauses de confidentialité standards ainsi que les mentions de conformité requises.",
    "Voici la synthèse des réformes récentes concernant votre situation. Vous devez remplir le formulaire d'allègement de charges avant la fin du trimestre.",
    "Votre lettre de contestation pour l'administration est rédigée. J'y ai intégré les références juridiques requises pour optimiser vos chances d'annulation.",
    "Le dossier d'immatriculation est prêt. N'oubliez pas de joindre un justificatif de domicile de moins de trois mois ainsi que votre pièce d'identité valide.",
    "J'ai analysé les termes du contrat. Deux clauses présentent un risque d'interprétation ambiguë, je vous conseille d'en demander la réécriture.",
    "Le formulaire Cerfa a été décodé. Voici la liste ordonnée des étapes pour finaliser votre déclaration sans erreur de catégorie fiscale."
];

// Vérification de session au démarrage
window.onload = function() {
    const savedUser = localStorage.getItem('admia_session');
    if (savedUser) {
        initApp(savedUser);
    }
};

function switchAuthScreen(screen) {
    document.getElementById('reg-error').style.display = 'none';
    document.getElementById('login-error').style.display = 'none';
    if (screen === 'login') {
        document.getElementById('register-screen').classList.add('auth-hidden');
        document.getElementById('login-screen').classList.remove('auth-hidden');
    } else {
        document.getElementById('login-screen').classList.add('auth-hidden');
        document.getElementById('register-screen').classList.remove('auth-hidden');
    }
}

function handleRegister() {
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const errorElement = document.getElementById('reg-error');

    if (!email || !password) return;

    let users = JSON.parse(localStorage.getItem('admia_users')) || [];
    
    // Vérification d'unicité de l'adresse e-mail
    if (users.some(u => u.email === email)) {
        errorElement.style.display = 'block';
        return;
    }

    // Enregistrement du nouvel utilisateur
    users.push({ email, password, messageCount: 0, lockUntil: null });
    localStorage.setItem('admia_users', JSON.stringify(users));

    initApp(email);
}

function handleLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errorElement = document.getElementById('login-error');

    let users = JSON.parse(localStorage.getItem('admia_users')) || [];
    let user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        errorElement.style.display = 'block';
        return;
    }

    initApp(email);
}

function initApp(email) {
    currentUser = email;
    localStorage.setItem('admia_session', email);
    
    // Masquer l'authentification et afficher le chat
    document.getElementById('register-screen').classList.add('auth-hidden');
    document.getElementById('login-screen').classList.add('auth-hidden');
    document.getElementById('app-interface').classList.add('chat-active');
    document.getElementById('user-display-email').innerText = email;

    checkLimits();
}

function handleLogout() {
    localStorage.removeItem('admia_session');
    currentUser = null;
    document.getElementById('app-interface').classList.remove('chat-active');
    switchAuthScreen('login');
}

function checkLimits() {
    let users = JSON.parse(localStorage.getItem('admia_users')) || [];
    let user = users.find(u => u.email === currentUser);
    if (!user) return;

    // Vérifier si le temps de verrouillage de 10 heures est écoulé
    if (user.lockUntil && Date.now() > user.lockUntil) {
        user.messageCount = 0;
        user.lockUntil = null;
        localStorage.setItem('admia_users', JSON.stringify(users));
    }

    // Si le quota est dépassé, activer la fenêtre de paiement
    if (user.messageCount >= MESSAGE_LIMIT) {
        if (!user.lockUntil) {
            user.lockUntil = Date.now() + LOCK_TIME_MS;
            localStorage.setItem('admia_users', JSON.stringify(users));
        }
        document.getElementById('user-input').disabled = true;
        document.getElementById('paywall-modal').classList.add('modal-active');
        startTimer(user.lockUntil);
    }
}

function sendMessage() {
    const inputField = document.getElementById('user-input');
    const text = inputField.value.trim();
    if (!text) return;

    // Afficher le message utilisateur
    appendMessage(text, 'user');
    inputField.value = '';

    // Incrémenter le compteur interne
    let users = JSON.parse(localStorage.getItem('admia_users')) || [];
    let user = users.find(u => u.email === currentUser);
    user.messageCount++;
    localStorage.setItem('admia_users', JSON.stringify(users));

    // Déclencher le loader animé
    const loader = document.getElementById('bot-loader');
    loader.style.display = 'block';

    // Simulation du délai de réflexion
    setTimeout(() => {
        loader.style.display = 'none';
        const randomReply = adminResponses[Math.floor(Math.random() * adminResponses.length)];
        appendMessage(randomReply, 'bot');
        checkLimits();
    }, 1500);
}

function appendMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Gestion du compte à rebours
function startTimer(endTime) {
    const timerDisplay = document.getElementById('timer-display');
    
    const interval = setInterval(() => {
        const remaining = endTime - Date.now();
        
        if (remaining <= 0) {
            clearInterval(interval);
            document.getElementById('user-input').disabled = false;
            document.getElementById('paywall-modal').classList.remove('modal-active');
            return;
        }

        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        timerDisplay.innerText = 
            (hours < 10 ? '0' : '') + hours + ':' + 
            (minutes < 10 ? '0' : '') + minutes + ':' + 
            (seconds < 10 ? '0' : '') + seconds;
    }, 1000);
}
