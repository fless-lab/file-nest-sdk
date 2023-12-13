const crypto = require('crypto');
const http = require('http');
const https = require('https');

class FileNestSDK {
  constructor(baseUrl, hmacSecret) {
    this.baseUrl = baseUrl;
    this.hmacSecret = hmacSecret;
  }

  async signRequest(data) {
    const signature = crypto
      .createHmac('sha256', this.hmacSecret)
      .update(data)
      .digest('hex');
    return signature;
  }

  async makeRequest(url, method, headers, payload) {
    const protocol = url.protocol === 'https:' ? https : http;
    return new Promise((resolve, reject) => {
      const options = {
        method,
        headers,
      };

      const req = protocol.request(url, options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({ status: res.statusCode, data });
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Error making ${method} request to ${url}: ${error.message}`));
      });

      if (payload) {
        req.write(payload);
      }

      req.end();
    });
  }

  async uploadFile(buffer) {
    try {
      const payload = {content: buffer.toString('base64') };
      const signature = await this.signRequest(JSON.stringify(payload));
      const url = new URL(`${this.baseUrl}/files`);
      const headers = {
        'x-hmac-signature': signature,
        'Content-Type': 'application/json',
      };
      const { status, data } = await this.makeRequest(url, 'POST', headers, JSON.stringify(payload));
      if (status !== 201) {
        throw new Error(`Failed to upload file: ${data}`);
      }
      const response = JSON.parse(data);
      return response.fileId;
    } catch (error) {
      throw error;
    }
  }

  async getFileData(fileId) {
    try {
      const method = "GET";
      const signatureString = `${method}/${fileId}`;
      const signature = await this.signRequest(signatureString);
      const url = new URL(`${this.baseUrl}/files/${fileId}`);
      const headers = {
        'x-hmac-signature': signature,
      };
      const { status, data } = await this.makeRequest(url, method, headers);
      if (status !== 200) {
        throw new Error(`Failed to get file data: ${data}`);
      }
      const response = JSON.parse(data);
      const { metadata, content } = response;
      return {
        mimeType: metadata.type,
        content: Buffer.from(content, 'base64'),
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      const method = "DELETE";
      const signatureString = `${method}/${fileId}`;
      const signature = await this.signRequest(signatureString);
      const url = new URL(`${this.baseUrl}/files/${fileId}`);
      const headers = {
        'x-hmac-signature': signature,
      };
      const { status, data } = await this.makeRequest(url, method, headers);
      if (status !== 204) {
        throw new Error(`Failed to delete file: ${data}`);
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async permanentDeleteFile(fileId) {
    try {
      const method = "DELETE";
      const signatureString = `${method}/${fileId}`;
      const signature = await this.signRequest(signatureString);
      const url = new URL(`${this.baseUrl}/files/permanent/${fileId}`);
      const headers = {
        'x-hmac-signature': signature,
      };
      const { status, data } = await this.makeRequest(url, method, headers);
      if (status !== 204) {
        throw new Error(`Failed to permanently delete file: ${data}`);
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async restoreFile(fileId) {
    try {
      const method = "PATCH";
      const signatureString = `${method}/restore/${fileId}`;
      const signature = await this.signRequest(signatureString);
      const url = new URL(`${this.baseUrl}/files/restore/${fileId}`);
      const headers = {
        'x-hmac-signature': signature,
      };
      const { status, data } = await this.makeRequest(url, method, headers);
      if (status !== 204) {
        throw new Error(`Failed to restore file: ${data}`);
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FileNestSDK;