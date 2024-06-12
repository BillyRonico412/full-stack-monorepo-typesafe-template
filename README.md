# Full stack monorepo typesafe web app template

This is a template to create a full stack typescript web app.

It uses the following technologies:

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [TanstackRouter](https://tanstack.com/router/latest)
- [tRPC](https://trpc.io/)
- [Prisma](https://www.prisma.io/)
- [SQLLite](https://www.sqlite.org/index.html)
- [Clerk](https://clerk.com/docs)

## Getting started

1. Create a new repository using this template
2. Clone the repository
3. Run `npm install`

### Back end

1. `cd back`
2. Create a `.env` file with the following content:

```bash
DATABASE_URL=""
PORT = ""
CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
UUID_ADMIN=""
```
3. Run `npm run dev`

### Front end

1. `cd front`
2. Create a `.env` file with the following content:

```bash
VITE_CLERK_PUBLISHABLE_KEY=""
VITE_SERVER_URL=""
```

3. Run `npm run dev`
4. Open your browser at `http://localhost:5173`
