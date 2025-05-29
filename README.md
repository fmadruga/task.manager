# Task Manager
Clona o repositório
```sh
git clone https://github.com/fmadruga/task.manager.git
```

## Rodar Back-end
```sh
cd backend
npm install
cp .env.example .env
```

Altere as variaveis do .env
```
APP_NAME=
APP_PORT=
APP_HOST=
APP_URL=

ACCESS_TOKEN_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

DB_DIALECT=
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=

MAIL_HOST=
MAIL_PORT=
MAIL_SECURE=
MAIL_USER=
MAIL_PASSOWORD=

NODE_ENV=
```

Depois rode o back-end
```sh
npm run start:dev
```

## Rodar Front-end
```sh
cd frontend
npm install
```

No arquivo src/api/axios.ts altere a baseURL para a url do seu back-end.

Depois rode o front-end
```sh
npm run dev
```

Acesse o front no http://localhost:5173