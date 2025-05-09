# Système de Réservation de Tables de Restaurant

Ce projet est une application web permettant aux restaurants de gérer leurs réservations de tables et aux clients de réserver des tables en ligne.

## Prérequis

- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- npm (inclus avec Node.js)

## Installation

1. Clonez le dépôt sur votre machine locale :

```bash
git clone <url-du-depot>
cd <nom-du-dossier>
```

2. Installez les dépendances :

```bash
npm install
```

## Lancement de l'application en mode développement

Pour démarrer le serveur de développement :

```bash
npm run dev
```

L'application sera accessible à l'adresse [http://localhost:5173](http://localhost:5173) dans votre navigateur.

## Structure du projet

```
/
├── public/              # Fichiers statiques
├── src/
│   ├── components/      # Composants réutilisables
│   │   ├── layout/      # Composants de mise en page (Header, Footer)
│   │   └── ui/          # Composants d'interface utilisateur
│   ├── context/         # Contextes React (Auth, etc.)
│   ├── pages/           # Pages de l'application
│   │   ├── client/      # Pages côté client
│   │   └── restaurant/  # Pages côté restaurant
│   ├── App.tsx          # Composant principal
│   └── main.tsx         # Point d'entrée
├── index.html           # Template HTML
├── package.json         # Dépendances et scripts
└── vite.config.ts       # Configuration de Vite
```

## Fonctionnalités principales

### Côté Client
- Recherche et sélection de restaurants
- Réservation de tables avec choix de date, heure et nombre de personnes
- Confirmation et gestion des réservations

### Côté Restaurant
- Tableau de bord pour gérer les réservations
- Éditeur de plan d'étage pour configurer la disposition des tables
- Gestionnaire d'horaires pour définir les disponibilités
- Gestionnaire de réservations pour suivre et modifier les réservations

## Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Compile l'application pour la production
- `npm run preview` : Prévisualise la version de production localement
- `npm run lint` : Exécute le linter pour vérifier la qualité du code

## Technologies utilisées

- [React](https://reactjs.org/) - Bibliothèque UI
- [TypeScript](https://www.typescriptlang.org/) - Typage statique
- [Vite](https://vitejs.dev/) - Outil de build
- [React Router](https://reactrouter.com/) - Routage
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [React DnD](https://react-dnd.github.io/react-dnd/) - Drag and Drop pour l'éditeur de plan d'étage
- [Lucide React](https://lucide.dev/) - Icônes

## Déploiement

Pour construire l'application pour la production :

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`, prêts à être déployés sur n'importe quel service d'hébergement statique.
