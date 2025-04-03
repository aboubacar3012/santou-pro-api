# 🚀 NestJS Template avec Prisma

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)

Ce projet est un template NestJS utilisant Prisma comme ORM pour développer rapidement des APIs robustes et performantes.

## 📋 Prérequis

- Node.js (version recommandée : 18+)
- npm ou yarn
- Une base de données PostgreSQL (ou autre selon votre configuration Prisma)

## 📚 Documentation API (Swagger)

La documentation interactive de l'API est disponible via Swagger UI à l'adresse:

[http://localhost:3000/api](http://localhost:3000/api)

Vous pouvez explorer et tester tous les endpoints disponibles directement depuis cette interface.


## 🔧 Installation

```bash
# Installation des dépendances
yarn install
```

## ⚙️ Configuration

<details open>
<summary>Configurer l'environnement</summary>

1. Créez un fichier `.env` à la racine du projet
2. Configurez votre URL de base de données dans ce fichier:

```properties
DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"
```
</details>

## 🗃️ Base de données

<details open>
<summary>Commandes Prisma</summary>

```bash
# Création des migrations Prisma
npx prisma migrate dev --name "initial-migration"

# Génération du client Prisma
npx prisma generate

# Chargement des données de test (si nécessaire)
npx prisma db seed

# Interface d'administration Prisma
npx prisma studio
```
</details>

## 🚦 Démarrer l'application

```bash
# Mode développement
yarn start:dev
# ou
npm run start:dev

# Mode production
yarn start:prod
# ou
npm run start:prod
```

## 🧪 Tests

```bash
# Tests unitaires
yarn test
# ou
npm run test

# Tests e2e
yarn test:e2e
# ou
npm run test:e2e
```

## 🏗️ Génération de ressources

Pour générer rapidement des modules, contrôleurs et services:

```bash
npx nest generate resource
```

## 📁 Structure du projet

```
src/                  # Code source de l'application
├── auth/             # Module d'authentification
├── users/            # Module utilisateurs
├── articles/         # Module articles
├── common/           # Utilitaires partagés
└── app.module.ts     # Module principal
prisma/               # Schéma et migrations Prisma
test/                 # Tests
```

## 🔌 Endpoints disponibles

| Méthode | Endpoint | Description | Authentification |
|---------|----------|-------------|------------------|
| `GET` | `/api/articles` | Récupère la liste paginée des articles publiés | Non |
| `GET` | `/api/articles/drafts` | Récupère la liste des articles en brouillon | Oui |
| `GET` | `/api/articles/:id` | Récupère un article par son identifiant | Non |
| `POST` | `/auth/login` | Authentifie un utilisateur et retourne un token JWT | Non |
| `GET` | `/users` | Récupère la liste paginée des utilisateurs | Oui |
| `GET` | `/users/:id` | Récupère un utilisateur par son identifiant | Oui |
| `POST` | `/users` | Crée un nouvel utilisateur | Non |
| `PATCH` | `/users/:id` | Met à jour un utilisateur par son identifiant | Oui |
| `DELETE` | `/users/:id` | Supprime un utilisateur par son identifiant | Oui |

## 📦 Modules communs utilisés

- `nestjs-prisma` - Intégration de Prisma avec NestJS
- `nestjs/swagger` - Génération de la documentation API avec Swagger
- `nestjs/jwt` - Gestion de l'authentification avec JWT

## 🔐 Authentification avec JWT

L'authentification est gérée via des tokens JWT. Pour accéder aux endpoints protégés:

1. Connectez-vous via `POST /auth/login` avec vos identifiants
2. Récupérez le token JWT dans la réponse
3. Ajoutez le token dans le header des requêtes suivantes:
   ```
   Authorization: Bearer <votre_token_jwt>
   ```

Le `JwtAuthGuard` protège les ressources nécessitant une authentification.

## 📝 Licence

[MIT](LICENSE)


1. Construire l'image Docker
Exécutez cette commande dans le répertoire contenant le fichier Dockerfile :

docker build -t santou-pro-api .
docker build --platform linux/amd64 -t aboubacar99/santou-pro-api:v1.1 .

docker push aboubacar99/santou-pro-api:v1.1

2. Exécuter le conteneur Docker
Lancez le conteneur en mappant le port 3001 du conteneur au port 3001 de votre machine hôte :

docker run -p 3001:3001 santou-pro-api

docker run --platform linux/amd64 -p 3001:3001 aboubacar99/santou-pro-api:v1.1

3. Accéder à l'application
L'application sera accessible à l'adresse suivante :
http://localhost:3001