#### RSA Key generation for Authentication

1. `openssl genrsa -out key.pem 2048`

2. `openssl genrsa -'in key.pem -outform PEM -pubout -out public.pem`