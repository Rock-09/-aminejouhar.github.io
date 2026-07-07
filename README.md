# Site CV — Amine Jouhar

CV en ligne (single-page, bilingue FR/EN) d'Amine Jouhar, ingénieur projets.
Site statique en **HTML / CSS / JavaScript** — aucune dépendance, aucun build.

## 📂 Structure

```
site-cv/
├── index.html                 # le site (contenu bilingue via data-fr / data-en)
├── css/style.css              # styles (thème clair, accent bleu)
├── js/script.js               # bascule FR/EN, menu mobile, animations
└── assets/
    ├── photo.png              # photo de profil
    ├── cosywee.png            # logo utilisé dans le détail ALTRADIS
    ├── CV_Amine_Jouhar.pdf    # CV téléchargeable (bouton « Télécharger CV »)
    └── logos/                 # logos entreprises & écoles (repli automatique)
        ├── cosywee.png        # ✅ présent
        └── egfi.png           # ✅ présent
```

## 🏢 Ajouter les logos manquants (entreprises / écoles)

Chaque expérience et formation affiche soit **le vrai logo**, soit un **monogramme**
(initiales) si le fichier logo est absent. Pour afficher un vrai logo, déposez une
image **PNG à fond transparent** dans `assets/logos/` avec **exactement** ce nom :

| Organisme | Fichier | État |
|-----------|---------|------|
| COSYWEE | `assets/logos/cosywee.png` | ✅ présent |
| EGFI | `assets/logos/egfi.png` | ✅ présent |
| NORMINDUS | `assets/logos/normindus.png` | ✅ présent |
| ECAM Louis de Broglie | `assets/logos/ecam.png` | ✅ présent |
| ESSTi | `assets/logos/essti.png` | ✅ présent |
| ANISSE International School | `assets/logos/anisse.png` | ✅ présent |
| STGMA LUX | `assets/logos/stgma.png` | ⬜ à ajouter (monogramme « SL » en attendant) |

Le logo apparaît automatiquement au rechargement de la page — aucune modification de code.

## 👀 Prévisualiser en local

Double-cliquez simplement sur `index.html` — il s'ouvre dans le navigateur.
(Optionnel, pour un rendu identique à la prod : `python -m http.server` puis ouvrez http://localhost:8000)

## ✏️ Modifier le contenu

Tout le texte est dans `index.html`. Chaque élément traduit porte **deux attributs** :

```html
<h3 data-fr="Texte français" data-en="English text">Texte français</h3>
```

- Modifiez `data-fr` **et** `data-en` (et le texte visible entre les balises pour le FR).
- La couleur d'accent se change en haut de `css/style.css` : variable `--accent`.

## 🚀 Mettre le site en ligne gratuitement (GitHub Pages)

> Vous n'avez pas encore de compte GitHub — voici la marche à suivre complète.

### 1. Créer un compte GitHub
- Allez sur https://github.com/signup et créez un compte (gratuit).
- Notez votre **nom d'utilisateur** (ex. `aminejouhar`).

### 2. Créer un dépôt (repository)
- Cliquez sur **New repository**.
- **Nom** : `mon-cv` (ou, pour avoir l'URL `https://VOTRE-PSEUDO.github.io`, nommez-le exactement `VOTRE-PSEUDO.github.io`).
- Laissez-le **Public**, ne cochez rien d'autre, puis **Create repository**.

### 3. Envoyer les fichiers
**Option simple (sans logiciel) :** sur la page du dépôt, cliquez **« uploading an existing file »**, glissez-déposez le **contenu** du dossier `site-cv` (le fichier `index.html`, et les dossiers `css`, `js`, `assets`), puis **Commit changes**.

**Option Git (si Git est installé) :** depuis le dossier `site-cv` :
```bash
git init
git add .
git commit -m "Initial commit — site CV"
git branch -M main
git remote add origin https://github.com/VOTRE-PSEUDO/mon-cv.git
git push -u origin main
```

### 4. Activer GitHub Pages
- Dans le dépôt : **Settings** → **Pages**.
- **Source** : `Deploy from a branch`.
- **Branch** : `main` + dossier `/ (root)` → **Save**.
- Patientez ~1 minute : l'URL de votre site s'affiche en haut de la page (ex. `https://VOTRE-PSEUDO.github.io/mon-cv/`).

C'est en ligne ! Chaque nouveau push (ou upload) met le site à jour automatiquement.

## 🌐 Nom de domaine personnalisé (optionnel)
Si un jour vous achetez un domaine (ex. `aminejouhar.com`), il se branche dans
**Settings → Pages → Custom domain**.
