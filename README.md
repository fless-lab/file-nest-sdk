### File Nest SDK

[![npm version](https://badge.fury.io/js/file-nest-sdk.svg)](https://www.npmjs.com/package/file-nest-sdk)

Simplify the integration of File Nest into your applications with the File Nest SDK. This software development kit provides a seamless experience for managing files effortlessly. Dive into a world of hassle-free file management with these enticing features:

#### Quick Start

```javascript
const fileNestSDK = require('file-nest-sdk');

// Create a new instance of File Nest SDK
const fileNest = new fileNestSDK({
  url: 'https://your-file-nest.com',
  hmacKey: 'your-secret-hmac-key',
});
```

#### Simplified Methods

**1. File Upload:**

```javascript
const fileBuffer = /* ... your file as a buffer ... */;

const fileId = await fileNest.uploadFile(fileBuffer);
console.log(`File uploaded successfully. ID: ${fileId}`);
```

**2. File Retrieval:**

```javascript
const fileId = 'your-file-id';

const fileData = await fileNest.getFileData(fileId);
console.log('File data retrieved:', fileData);
```

#### Additional Functions (Not Tested Yet)

**3. File Deletion:**

```javascript
const fileId = 'your-file-id';

const isDeleted = await fileNest.deleteFile(fileId);
console.log(`File ${isDeleted ? 'deleted' : 'not deleted'}`);
```

**4. Permanent File Deletion:**

```javascript
const fileId = 'your-file-id';

const isDeleted = await fileNest.permanentDeleteFile(fileId);
console.log(`File ${isDeleted ? 'permanently deleted' : 'not permanently deleted'}`);
```

**5. File Restoration:**

```javascript
const fileId = 'your-file-id';

const isRestored = await fileNest.restoreFile(fileId);
console.log(`File ${isRestored ? 'restored' : 'not restored'}`);
```

#### Benefits of Using the SDK

- **Effortless Integration:** Create an instance, and the SDK handles the configuration details for you.

- **Optimized Security:** Encapsulation of HMAC signature details ensures secure interaction with File Nest.

- **Time Saving:** Simplified methods reduce development time, allowing you to focus on what matters.

#### Installation

```bash
npm install file-nest-sdk
```

**Note:** Replace the placeholder values (URL and HMAC key) with those of your File Nest instance.

#### Explore File Nest and Example Usage

- **File Nest Repository:** [File Nest](https://github.com/fless-lab/file-nest)
  
- **Example Usage Repository:** [File Nest Usage Example](https://github.com/fless-lab/file-nest-usage-example)

**Important:** Currently, only the `uploadFile` and `getFileData` functions have been tested. Feel free to explore additional functions and contribute to their improvement.