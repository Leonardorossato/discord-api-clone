export {};

// Here we declare the members of the process.env object, so that we
// can use them in our application code in a type-safe manner.
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: number;
      JWT_SECRET: string;
      POSTGRES_HOST: string;
      POSTGRES_USER: string;
      POSTGRES_PORT: number;
      POSTGRES_PASSWORD: string;
      NODEMAILER_HOST: string;
      NODEMAILER_PORT: number;
      NODEMAILER_USER: string;
      NODEMAILER_PASSWORD: string;
    }
  }
}
