# Next.js jobwebsite

## Description

This job website is was created with Next.js. It has:

- a home page
![image](https://user-images.githubusercontent.com/108072532/215479644-a580023c-0b3a-42a2-88ec-6d9b115c0db3.png)

- a job list page
![image](https://user-images.githubusercontent.com/108072532/215479951-79d1d3d0-f74c-4f79-953e-c6040722e631.png)

- a single job list page
![image](https://user-images.githubusercontent.com/108072532/215480134-04e85323-ada4-415b-9b21-335b345159fd.png)
or each single job with a type of employment, description, salary, location

- a login page
![image](https://user-images.githubusercontent.com/108072532/215480722-91440f32-fbe1-4244-8abf-c07da9910ea6.png)

- a add a job page
![image](https://user-images.githubusercontent.com/108072532/215481417-0407f2a4-bb4a-472a-9317-2105f385c220.png)

- a registration page
![image](https://user-images.githubusercontent.com/108072532/215480924-13c0ffdd-e735-4b88-881b-a72b881d971a.png)


## Technologies used:

- Next.js
- Node
- Typescript
- Bcrypt
- Postgresql
- Ley
- Dotenv
- Emotion
- Git, GitHub
- PSQL
- js-cookie
- Sharp
- Eslint

## Setup instructions

- Clone the repo to your local machine with git clone <repo>
- Setup the database by downloading and installing PostgreSQL
- Create a user and a job database
- Create a new file .env
- Copy the environment variables from .env-example into .env
- Replace the placeholders xxxxx with your username, password and name of database
- Install dotenv-cli with yarn global add dotenv-cli
- Run yarn install in your command line
- Run the migrations with yarn migrate up
- Start the server by running yarn dev

## First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.
The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
  You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
