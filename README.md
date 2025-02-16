## Getting Started

Membuat file .env yang isinya :

```
// Neon vercel.com
DATABASE_URL=postgres://neondb_owner:xxxxxx
DATABASE_URL_UNPOOLED=postgresql://neondb_owner:xxxxxx
PGHOST=xxxxxx
PGHOST_UNPOOLED=xxxxxx
PGUSER=xxxxxx
PGDATABASE=xxxxxx
PGPASSWORD=xxxxxx
POSTGRES_URL=postgres://neondb_owner:xxxxxx
POSTGRES_URL_NON_POOLING=postgres://neondb_owner:xxxxxx
POSTGRES_USER=xxxxxx
POSTGRES_HOST=xxxxxx
POSTGRES_PASSWORD=xxxxxx
POSTGRES_DATABASE=xxxxxx
POSTGRES_URL_NO_SSL=postgres://neondb_owner:xxxxxx
POSTGRES_PRISMA_URL=postgres://neondb_owner:xxxxxx
connect_timeout=xxxxxx
sslmode=xxxxxx

//Random String (Opsional 64 karakter)
AUTH_SECRET="xxxxxx"

// https://console.cloud.google.com
AUTH_GOOGLE_ID="xxxxxx"
AUTH_GOOGLE_SECRET="xxxxxx"

// https://github.com/settings/developers
AUTH_GITHUB_ID="xxxxxx"
AUTH_GITHUB_SECRET="xxxxxx"

```

Awal instalasi package, migrate prisma, dan menjalankan mode development :

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev

```

Buka di Browser : [http://localhost:3000](http://localhost:3000)

Prisma Studio, mengelola data :

```bash
npx prisma studio
```

Prisma Studio Web Page : [http://localhost:5555](http://localhost:5555)
