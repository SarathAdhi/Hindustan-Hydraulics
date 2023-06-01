const jwt = require('jsonwebtoken');
const fs = require('fs');

// Read the secret key from the file
const secretKey = fs.readFileSync('./backend/secret.key', 'utf8');

// Create a payload for the token
const payload = {
  user_id: '123',
  username: 'john_doe',
  role: 'admin'
};

// Sign the JWT token
const token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });

console.log('Signed JWT token:', token);

// Verify the JWT token

jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    // Token verification failed
    console.error('Invalid token:', err.message);
    return;
  }

  // Token verification successful
  console.log('Token verified successfully:', decoded);
});