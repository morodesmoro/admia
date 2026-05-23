# Admia - Assistant Administratif Intelligent

## 📋 Description

Admia est une application web moderne et intelligente conçue pour vous aider dans la gestion de vos démarches administratives. Interface chat intuitive, authentification utilisateur et système de quota flexible.

## 🚀 Démarrage rapide

### Pré-requis
- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Aucune installation serveur requise

### Installation

1. Clonez le repository :
```bash
git clone https://github.com/morodesmoro/admia.git
cd admia
```

2. Démarrez un serveur local :
```bash
npm run dev
```

3. Ouvrez dans votre navigateur :
```
http://localhost:8000/src/html/index.html
```

## 📁 Structure du Projet

```
admia/
├── src/
│   ├── html/
│   │   └── index.html          # Page principale
│   ├── css/
│   │   └── styles.css          # Styles globaux
│   └── js/
│       └── app.js              # Logique applicative
├── assets/                      # Images, icônes, ressources
├── package.json                 # Configuration npm
├── .gitignore                   # Fichiers ignorés par git
└── README.md                    # Ce fichier
```

## 🎨 Fonctionnalités

- **Authentification** : Inscription et connexion sécurisées avec LocalStorage
- **Chat Intelligent** : Interface conversationnelle pour vos demandes administratives
- **Système de Quota** : 8 messages gratuits, puis paywall avec compte à rebours
- **Design Moderne** : Interface sombre avec gradient rose-turquoise
- **Responsive** : Adapté à tous les appareils

## 🔐 Authentification

L'application utilise LocalStorage pour gérer les sessions utilisateur.

**Données stockées :**
- `admia_session` : Email de l'utilisateur actuel
- `admia_users` : Liste des utilisateurs (email, mot de passe, compteur de messages)

## 💬 Système de Messages

- **Limite gratuite** : 8 messages par utilisateur
- **Temps de verrouillage** : 10 heures après dépassement
- **Déblocage** : Via paiement PayPal (10€/mois) ou attente du délai

## 🎯 Technologies

- HTML5
- CSS3 (Variables CSS, Gradients, Animations)
- JavaScript (ES6+)
- LocalStorage API

## 🎨 Personnalisation

### Modifier les couleurs
Éditer les variables CSS dans `src/css/styles.css` :
```css
--gradient-primary: linear-gradient(135deg, #ff758c 0%, #ff7eb3 50%, #86fde8 100%);
```

### Ajouter des réponses administratives
Modifier l'array `adminResponses` dans `src/js/app.js` :
```javascript
const adminResponses = [
    "Votre réponse personnalisée...",
    // ...
];
```

## 🔗 Liens

- **PayPal** : https://www.paypal.com/ncp/payment/VV5WKFXWMJ6QN
- **GitHub** : https://github.com/morodesmoro/admia

## 📝 Licence

MIT License - Voir LICENSE pour plus de détails

## 👨‍💻 Auteur

**morodesmoro**

## 🤝 Contribution

Les contributions sont bienvenues ! N'hésitez pas à ouvrir une issue ou un pull request.
