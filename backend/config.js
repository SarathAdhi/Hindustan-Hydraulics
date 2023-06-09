module.exports = {
    jwt: {
      publicKey: 'public.pem', // Path to the public key file or the JWKS endpoint URL
      privateKey: 'private.pem', // Path to the private key file
      secretKey : 'secret.key', // Path to the
      algorithm: 'HS256', // Algorithm used to sign the token
        expiresIn: '1d', // Token lifetime
      issuer: 'Backend Auth System', // Issuer of the token
      audience: 'Frontend-web' // Audience the token is intended for
    }
  };
  