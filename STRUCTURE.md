# Structure & commandes du projet

Ce document résume l'organisation du projet Nuxt et les commandes npm principales.

---

## Structure rapide

```txt
.
├── .github/              # Workflows GitHub Actions
├── .husky/               # Hooks Git
├── cypress/              # Support Cypress
├── docker/               # Dockerfiles staging / production
├── k8s/                  # Manifests Kubernetes
├── src-core/             # Code métier indépendant de Nuxt
├── src-nuxt/             # Racine de l'application Nuxt
├── tests/                # Tests e2e et unitaires
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

---

## Dossier `src-nuxt/`

`src-nuxt/` est le **root Nuxt**. Toutes les commandes Nuxt pointent donc vers ce dossier :

```bash
nuxi dev src-nuxt
nuxi build src-nuxt
nuxi generate src-nuxt
nuxi preview src-nuxt
nuxi prepare src-nuxt
```

Structure attendue :

```txt
src-nuxt/
├── .env.development
├── .env.staging
├── .env.production
├── .nuxtrc
├── .nuxtignore
├── nuxt.config.ts
├── app/                  # App Vue/Nuxt
├── server/               # Routes et handlers Nitro
├── public/               # Fichiers statiques publics
├── modules/              # Modules Nuxt locaux
├── layers/               # Layers Nuxt locaux
├── content/              # Contenu Nuxt Content si activé
└── shared/               # Code partagé app/server
```

---

## Rôle des dossiers Nuxt

| Dossier             | Rôle                                                                |
| ------------------- | ------------------------------------------------------------------- |
| `src-nuxt/app/`     | Pages, composants, layouts, plugins, stores, assets, app.vue        |
| `src-nuxt/server/`  | API routes, middleware et code serveur Nitro                        |
| `src-nuxt/public/`  | Fichiers servis directement : favicon, images publiques, robots.txt |
| `src-nuxt/modules/` | Modules Nuxt locaux auto-enregistrés                                |
| `src-nuxt/layers/`  | Layers Nuxt pour factoriser des parties d'app                       |
| `src-nuxt/content/` | Contenus Markdown/YAML/JSON si `@nuxt/content` est utilisé          |
| `src-nuxt/shared/`  | Code partagé entre client et serveur                                |

---

## Configuration Nuxt recommandée

Comme `src-nuxt/` est déjà le root Nuxt, les chemins dans `nuxt.config.ts` doivent être relatifs à `src-nuxt/`.

```ts
export default defineNuxtConfig({
  srcDir: 'app',
  serverDir: 'server',

  dir: {
    public: 'public',
    modules: 'modules',
    shared: 'shared',
  },

  ssr: process.env.NUXT_SSR !== 'false',
})
```

Avec cette règle :

```txt
NUXT_SSR=true   → SSR activé
NUXT_SSR=false  → mode SPA / rendu client uniquement
NUXT_SSR absent → SSR activé par défaut
```

---

# Commandes npm

## Développement local

Ces commandes utilisent `nuxi dev`. Elles servent au développement avec Vite/HMR.

Port utilisé : `1470`.

| Commande                      | Env                | Rendu | Description                   |
| ----------------------------- | ------------------ | ----- | ----------------------------- |
| `npm run web:run:dev:ssr`     | `.env.development` | SSR   | Dev local classique avec SSR  |
| `npm run web:run:dev:spa`     | `.env.development` | SPA   | Dev local sans SSR            |
| `npm run web:run:staging:ssr` | `.env.staging`     | SSR   | Dev avec variables staging    |
| `npm run web:run:staging:spa` | `.env.staging`     | SPA   | Dev staging sans SSR          |
| `npm run web:run:prod:ssr`    | `.env.production`  | SSR   | Dev avec variables production |
| `npm run web:run:prod:spa`    | `.env.production`  | SPA   | Dev production sans SSR       |

Exemple :

```bash
npm run web:run:dev:ssr
```

---

## Développement avec Docker

Ces commandes lancent `docker compose up` avec une variable `ENV_MODE`.

| Commande                             | ENV_MODE      | Rendu |
| ------------------------------------ | ------------- | ----- |
| `npm run web:run:dev:docker:ssr`     | `dev-ssr`     | SSR   |
| `npm run web:run:dev:docker:spa`     | `dev-spa`     | SPA   |
| `npm run web:run:staging:docker:ssr` | `staging-ssr` | SSR   |
| `npm run web:run:staging:docker:spa` | `staging-spa` | SPA   |
| `npm run web:run:prod:docker:ssr`    | `prod-ssr`    | SSR   |
| `npm run web:run:prod:docker:spa`    | `prod-spa`    | SPA   |

Exemple :

```bash
npm run web:run:dev:docker:ssr
```

---

# Builds Nuxt

Il y a deux choix à comprendre :

```txt
generate → build static
build    → build server

NUXT_SSR=false → SPA / sans SSR
NUXT_SSR=true  → SSR ou pré-rendu HTML
```

Cela donne 4 combinaisons.

---

## Résumé des combinaisons

| Type            | Commande Nuxt   | SSR | Résultat                 |
| --------------- | --------------- | --: | ------------------------ |
| Static sans SSR | `nuxi generate` | Non | SPA statique             |
| Static avec SSR | `nuxi generate` | Oui | Site statique pré-rendu  |
| Server sans SSR | `nuxi build`    | Non | App SPA servie par Nitro |
| Server avec SSR | `nuxi build`    | Oui | App SSR servie par Nitro |

---

## Static sans SSR

Utilise :

```bash
NUXT_SSR=false nuxi generate
```

Résultat : fichiers statiques, rendu côté navigateur.

| Commande                           | Env                |
| ---------------------------------- | ------------------ |
| `npm run web:build:static:dev`     | `.env.development` |
| `npm run web:build:static:staging` | `.env.staging`     |
| `npm run web:build:static:prod`    | `.env.production`  |

---

## Static avec SSR

Utilise :

```bash
NUXT_SSR=true nuxi generate
```

Résultat : HTML généré au moment du build pour les routes pré-rendues.  
Ce n'est pas du SSR à chaque requête.

| Commande                               | Env                |
| -------------------------------------- | ------------------ |
| `npm run web:build:static:dev:ssr`     | `.env.development` |
| `npm run web:build:static:staging:ssr` | `.env.staging`     |
| `npm run web:build:static:prod:ssr`    | `.env.production`  |

---

## Server sans SSR

Utilise :

```bash
NUXT_SSR=false nuxi build
```

Résultat : serveur Nitro qui sert une SPA. Le rendu principal se fait côté navigateur.

| Commande                           | Env                |
| ---------------------------------- | ------------------ |
| `npm run web:build:server:dev`     | `.env.development` |
| `npm run web:build:server:staging` | `.env.staging`     |
| `npm run web:build:server:prod`    | `.env.production`  |

---

## Server avec SSR

Utilise :

```bash
NUXT_SSR=true nuxi build
```

Résultat : serveur Nitro avec rendu HTML côté serveur à la requête.

| Commande                               | Env                |
| -------------------------------------- | ------------------ |
| `npm run web:build:server:dev:ssr`     | `.env.development` |
| `npm run web:build:server:staging:ssr` | `.env.staging`     |
| `npm run web:build:server:prod:ssr`    | `.env.production`  |

---

## Preview

Les commandes `preview` servent à tester le dernier build ou generate.

Port utilisé : `1461`.

| Commande                      | Env                |
| ----------------------------- | ------------------ |
| `npm run web:preview:dev`     | `.env.development` |
| `npm run web:preview:staging` | `.env.staging`     |
| `npm run web:preview:prod`    | `.env.production`  |

Exemple :

```bash
npm run web:build:server:prod:ssr
npm run web:preview:prod
```

---

# À retenir

```txt
web:run:*:ssr
→ dev Nuxt avec SSR

web:run:*:spa
→ dev Nuxt sans SSR

web:build:static:*
→ nuxi generate + NUXT_SSR=false

web:build:static:*:ssr
→ nuxi generate + NUXT_SSR=true

web:build:server:*
→ nuxi build + NUXT_SSR=false

web:build:server:*:ssr
→ nuxi build + NUXT_SSR=true

web:preview:*
→ preview du dernier build/generate
```

---

## Dossiers générés à ne pas modifier

```txt
node_modules/
src-nuxt/.nuxt/
src-nuxt/.output/
```

Ces dossiers peuvent être supprimés puis régénérés.

```bash
npm run web:cleanup
npm run web:prepare
```
