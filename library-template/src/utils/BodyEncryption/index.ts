import Crypto from "crypto-js";
const secretKey: any = process.env.BODY_ENCRYPTION_SECRET_KEY;

const encrypt = (text: string) => {
  var encryptedAES = Crypto.AES.encrypt(text, secretKey);
  return encryptedAES.toString();
};

const decrypt = (text: string) => {
  var decryptedBytes = Crypto.AES.decrypt(text, secretKey);
  return decryptedBytes.toString(Crypto.enc.Utf8);
};

export { encrypt, decrypt };
