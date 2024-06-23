## Authentication

All API endpoints require authentication using JSON Web Tokens (JWT).

To authenticate:

1. Obtain a JWT by calling the `/auth/login` endpoint with your credentials
2. Include the JWT in the Authorization header of all subsequent requests:
