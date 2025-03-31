import fs from 'fs'
import crypto from 'crypto'

// Gerando uma chave privada e um certificado autoassinado
const { privateKey, cert } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

// Salvando os arquivos gerados
fs.writeFileSync('key.pem', privateKey.export({ type: 'pkcs1', format: 'pem' }));
fs.writeFileSync('cert.pem', cert.export({ type: 'x509', format: 'pem' }));

console.log('Certificado e chave gerados com sucesso!');
