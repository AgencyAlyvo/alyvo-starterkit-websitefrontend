# Alyvo - StarterKit - Frontend

## 🛠 Tech Stack

- TypeScript (Language)
- Nuxt
- CI / CD (Github Actions)
- Docker / DockerCompose (Development-Local)
- Kubernetes (Development-Remote, Staging and Production)

<br /><br />

---

<br /><br />

## 📚 Application URL to domains of different environments - WebSite

- Staging : https://staging.seatyrants.com
- Production : https://seatyrants.com

<br /><br />

---

<br /><br />

## 📦 Versionning

On utilise la convention SemVer : https://semver.org/lang/fr/ <br /><br />
Pour une Release classique : MAJOR.MINOR.PATCH <br />
Pour une Pre-Release, exemples : MAJOR.MINOR.PATCH-rc.0 OR MAJOR.MINOR.PATCH-beta.3 <br /><br />

Nous utilison release-please de Google pour versionner, via Github Actions. <br />
Pour que cela sois pris en compte il faut utiliser les conventionnal commits : https://www.conventionalcommits.org/en/v1.0.0/ <br />
Release Please crée une demande d'extraction de version après avoir remarqué que la branche par défaut contient des « unités publiables » depuis la dernière version. Une unité publiable est un commit sur la branche avec l'un des préfixes suivants : `feat` / `feat!` et `fix` / `fix!`. <br /><br />

La première Release que créer release-please automatiquement est la version : 1.0.0 <br />
Pour créer une Pre-Release faire un commit vide, par exemple si on'ai à la version 1.0.0, on peut faire :

```bash
git commit --allow-empty -m "chore: release 1.1.0-rc.0" -m "Release-As: 1.1.0-rc.0"
```

<br /><br />

---

<br /><br />

## ⚙️ Setup Environment Development

1. Clone the project repository using the following commands :

```bash
git clone git@github.com:CrzGames/SeaTyrants_WebSite_FrontEnd.git
```

2. Steps by Platform :

```bash
# Windows :
1. Requirements : Windows >= 10
2. Download and Install WSL2 : https://learn.microsoft.com/fr-fr/windows/wsl/install
3. Download and Install Docker Desktop : https://docs.docker.com/desktop/install/windows-install/

# macOS :
1. Requirements : macOS Intel x86_64 or macOS Apple Silicon arm64
2. Requirements (2) : macOS 11.0 (Big Sur) +
2. Download and Install Docker Desktop : https://docs.docker.com/desktop/install/mac-install/

# Linux (Ubuntu / Debian) :
1. Requirements : Ubuntu >= 20.04 or Debian >= 10
2. Download and Install Docker (Ubuntu) : https://docs.docker.com/engine/install/ubuntu/
3. Download and Install Docker (Debian) : https://docs.docker.com/engine/install/debian/
```

<br /><br />

---

<br /><br />

## 🔄 Cycle Development with Docker

```bash
npm install # just for the idea
npm run web:run:dev:docker
```

## 🔄 Cycle Development not Docker

```bash
npm install
npm run web:run:dev
```

<br /><br />

---

<br /><br />

## 🚀 Production

### ⚙️➡️ Automatic Distribution Process (CI / CD)

#### Si c'est un nouveau projet suivez les instructions :

1. Ajoutées les SECRETS_GITHUB pour :
   - DOCKER_HUB_USERNAME
   - DOCKER_HUB_ACCESS_TOKEN
   - KUBECONFIG
   - PAT (crée un nouveau token si besoin sur le site de github puis dans le menu du "Profil" puis -> "Settings" -> "Developper Settings' -> 'Personnal Access Tokens' -> Tokens (classic))
