# 🚀 Santou Pro API

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)

Santou Pro API est une API robuste et performante conçue pour les petites entreprises et les indépendants afin de gérer efficacement leurs besoins en matière de facturation.

## Fonctionnalités

- Authentification et autorisation des utilisateurs avec JWT
- Opérations CRUD pour les comptes, clients, entreprises et factures
- Support de la pagination pour la liste des ressources
- Intégration de Prisma ORM pour la gestion de la base de données
- Documentation Swagger pour les endpoints de l'API
- Support de la configuration de l'environnement
- Support de Docker pour la containerisation

## 📋 Prérequis

- Node.js (version recommandée : 18+)
- npm ou yarn
- Une base de données PostgreSQL (ou autre selon votre configuration Prisma)

## 📚 Documentation de l'API (Swagger)

La documentation interactive de l'API est disponible via Swagger UI à l'adresse suivante :

[http://localhost:3000/api](http://localhost:3000/api)

Vous pouvez explorer et tester tous les endpoints disponibles directement depuis cette interface.

## 🔧 Installation

```bash
# Installer les dépendances
yarn install
```

## ⚙️ Configuration

<details open>
<summary>Configurer l'environnement</summary>

1. Créez un fichier `.env` à la racine du projet
2. Configurez l'URL de votre base de données dans ce fichier :

```properties
DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"
```
</details>

## 🗃️ Base de données

<details open>
<summary>Commandes Prisma</summary>

```bash
# Créer des migrations Prisma
npx prisma migrate dev --name "initial-migration"

# Générer le client Prisma
npx prisma generate

# Charger des données de test (si nécessaire)
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

## 🏗️ Générer des ressources

Pour générer rapidement des modules, contrôleurs et services :

```bash
npx nest generate resource
```

## 📁 Structure du projet

```
src/                  # Code source de l'application
├── auth/             # Module d'authentification
├── users/            # Module des utilisateurs
├── articles/         # Module des articles
├── common/           # Utilitaires partagés
└── app.module.ts     # Module principal
prisma/               # Schéma et migrations Prisma
test/                 # Tests
```

## 🔌 Endpoints disponibles

| Méthode | Endpoint | Description | Authentification |
|--------|----------|-------------|------------------|
| `GET`  | `/api/articles` | Récupérer la liste paginée des articles publiés | Non |
| `GET`  | `/api/articles/drafts` | Récupérer la liste des articles en brouillon | Oui |
| `GET`  | `/api/articles/:id` | Récupérer un article par son ID | Non |
| `POST` | `/auth/login` | Authentifier un utilisateur et retourner un token JWT | Non |
| `GET`  | `/users` | Récupérer la liste paginée des utilisateurs | Oui |
| `GET`  | `/users/:id` | Récupérer un utilisateur par son ID | Oui |
| `POST` | `/users` | Créer un nouvel utilisateur | Non |
| `PATCH`| `/users/:id` | Mettre à jour un utilisateur par son ID | Oui |
| `DELETE`| `/users/:id` | Supprimer un utilisateur par son ID | Oui |

## 📦 Modules couramment utilisés

- `nestjs-prisma` - Intégration de Prisma avec NestJS
- `nestjs/swagger` - Génération de la documentation de l'API avec Swagger
- `nestjs/jwt` - Gestion de l'authentification avec JWT

## 🔐 Authentification avec JWT

L'authentification est gérée via des tokens JWT. Pour accéder aux endpoints protégés :

1. Connectez-vous via `POST /auth/login` avec vos identifiants
2. Récupérez le token JWT de la réponse
3. Ajoutez le token à l'en-tête des requêtes suivantes :
   ```
   Authorization: Bearer <your_jwt_token>
   ```

Le `JwtAuthGuard` protège les ressources nécessitant une authentification.

## 📝 Licence

[MIT](LICENSE)
