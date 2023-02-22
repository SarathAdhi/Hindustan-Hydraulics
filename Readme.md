## Hindustan Hydraulics

This project is based on building a Dashboard model for Hydraulics and Pneumatic Company. 

It includes 2 dashboards - Inward Movement and Outward Movement, authentication and forms entry for the warehouse, billing counters, security.

The Frontend of the project is still in development and currently not available for beta.

## 🖥️ Tech Stack

**Backend:**

![nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)&nbsp;
![expressjs](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)&nbsp;
![mongodb](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)&nbsp;
![jwt](	https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)&nbsp;

### Setting up the Project

1. Run ```cd backend``` and generate public key and private key using openssl
2. `openssl genrsa -out private.pem 2048`
3. `openssl rsa -in private.pem -outform PEM -pubout -out public.pem`

4. Install docker and docker compose
5. Once docker is installed, run `docker-compose up`
6. The APIs should be available at `http://localhost:3000`