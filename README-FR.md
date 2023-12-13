### File Nest SDK

[![npm version](https://badge.fury.io/js/file-nest-sdk.svg)](https://www.npmjs.com/package/file-nest-sdk)

Facilitez l'intégration de File Nest dans vos applications avec le File Nest SDK. Ce kit de développement logiciel offre une expérience transparente pour gérer vos fichiers sans effort. Plongez dans un univers de gestion de fichiers sans tracas avec ces fonctionnalités alléchantes :

#### Démarrage Rapide

```javascript
const fileNestSDK = require('file-nest-sdk');

// Créez une nouvelle instance de File Nest SDK
const fileNest = new fileNestSDK({
  url: 'https://votre-file-nest.com',
  hmacKey: 'votre-clé-hmac-secrète',
});
```

#### Méthodes Simplifiées

**1. Téléchargement de Fichier :**

```javascript
const fileBuffer = /* ... votre fichier sous forme de tampon ... */;

const fileId = await fileNest.uploadFile(fileBuffer);
console.log(`Fichier téléchargé avec succès. ID : ${fileId}`);
```

**2. Récupération de Fichier :**

```javascript
const fileId = 'votre-id-de-fichier';

const fileData = await fileNest.getFileData(fileId);
console.log('Données du fichier récupérées :', fileData);
```

#### Fonctions Additionnelles (Pas Encore Testées)

**3. Suppression de Fichier :**

```javascript
const fileId = 'votre-id-de-fichier';

const isDeleted = await fileNest.deleteFile(fileId);
console.log(`Fichier ${isDeleted ? 'supprimé' : 'non supprimé'}`);
```

**4. Suppression Permanente de Fichier :**

```javascript
const fileId = 'votre-id-de-fichier';

const isDeleted = await fileNest.permanentDeleteFile(fileId);
console.log(`Fichier ${isDeleted ? 'supprimé définitivement' : 'non supprimé définitivement'}`);
```

**5. Restauration de Fichier :**

```javascript
const fileId = 'votre-id-de-fichier';

const isRestored = await fileNest.restoreFile(fileId);
console.log(`Fichier ${isRestored ? 'restauré' : 'non restauré'}`);
```

#### Avantages de l'Utilisation du SDK

- **Intégration Sans Effort :** Créez une instance, et le SDK gère les détails de configuration pour vous.

- **Sécurité Optimisée :** L'encapsulation des détails de la signature HMAC assure une interaction sécurisée avec File Nest.

- **Gain de Temps :** Des méthodes simplifiées réduisent le temps de développement, vous permettant de vous concentrer sur l'essentiel.

#### Installation

```bash
npm install file-nest-sdk
```

**Note :** Remplacez les valeurs génériques (URL et clé HMAC) par celles de votre instance File Nest.

#### Explorez File Nest et l'Exemple d'Utilisation

- **Répertoire File Nest :** [File Nest](https://github.com/fless-lab/file-nest)
  
- **Répertoire d'Exemple d'Utilisation :** [File Nest Usage Example](https://github.com/fless-lab/file-nest-usage-example)

**Important :** Actuellement, seules les fonctions `uploadFile` et `getFileData` ont été testées. N'hésitez pas à explorer les fonctions supplémentaires et à contribuer à leur amélioration.