const { writeFileSync } = require('fs');
const { config } = require('dotenv');

const env = config().parsed;

const targetPath = './src/environments/environment.ts';
const fileContent = `export const environment = {
  production: true,
  apiUrl: '${env.API_URL}'
};`;

writeFileSync(targetPath, fileContent);