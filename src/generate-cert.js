import fs from 'fs';
import forge from 'node-forge';

// Função para gerar o par de chaves e o certificado autoassinado
function generateCert() {
  // Geração da chave privada
  const keys = forge.pki.rsa.generateKeyPair(2048);
  
  // Geração do certificado X.509 autoassinado
  const cert = forge.pki.createCertificate();
  cert.publicKey = keys.publicKey;
  cert.serialNumber = '01';
  cert.validFrom = new Date(); // Data de validade do certificado
  cert.validTo = new Date();
  cert.validTo.setFullYear(cert.validTo.getFullYear() + 1); // O certificado será válido por 1 ano

  // Informações sobre o sujeito (quem é o proprietário do certificado)
  const attrs = [{
    name: 'commonName',
    value: 'localhost'
  }];
  cert.setSubject(attrs);
  cert.setIssuer(attrs); // No caso de autoassinado, o emissor é o mesmo que o sujeito

  // Assinando o certificado com a chave privada
  cert.sign(keys.privateKey);

  // Convertendo as chaves para o formato PEM
  const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);
  const certificatePem = forge.pki.certificateToPem(cert);

  // Gravando os arquivos PEM
  fs.writeFileSync('key.pem', privateKeyPem);
  fs.writeFileSync('cert.pem', certificatePem);

  console.log('Certificado e chave gerados com sucesso!');
}

generateCert();
