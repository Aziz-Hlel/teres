import dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

const baseSchema = z.object({
  // APP
  API_PORT: z.coerce.number().positive(),

  // FIREBASE
  FIREBASE_CERT: z.string().min(1),

  // DB
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.coerce.number(),
  DB_HOST: z.enum(['localhost', 'db']),

  // REDIS
  REDIS_PORT: z.coerce.number().positive(),
  REDIS_PASSWORD: z.string().min(1),
  REDIS_HOST: z.enum(['localhost', 'redis']),

  // SMTP
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number().positive(),
  SMTP_SECURE: z.string().transform((val) => val === 'true'),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),

  // APP VERSIONS
  IOS_MIN_SUPPORTED_VER: z.string().regex(/^\d+\.\d+\.\d+$/, {
    message: 'IOS_MIN_SUPPORTED_VER must be in the format x.y.z',
  }),
  ANDROID_MIN_SUPPORTED_VER: z.string().regex(/^\d+\.\d+\.\d+$/, {
    message: 'ANDROID_MIN_SUPPORTED_VER must be in the format x.y.z',
  }),
});

const prodSchema = baseSchema.extend({
  NODE_ENV: z.enum(['production', 'stage']),

  AWS_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_S3_BUCKET: z.string(),
  AWS_CLOUDFRONT_URL: z.string(),

  // CORS
  ALLOWED_ORIGIN_PATTERNS: z
    .string({ error: 'ALLOWED_ORIGIN_PATTERNS is required in prod environments' })
    .transform((origins) => origins.split(','))
    .refine(
      (origins) => {
        const regexOrigins = /^https:\/\/([a-z0-9-]+\.)+[a-z]{2,}(,([a-z0-9-]+\.)+[a-z]{2,})*$/i;
        return origins.every((origin) => regexOrigins.test(origin));
      },
      {
        error:
          'ALLOWED_ORIGIN_PATTERNS is invalid, it does not follow the pattern https://domain.com,https://domain.com',
      },
    ),
});

const devSchema = baseSchema.extend({
  NODE_ENV: z.enum(['dev', 'build']),

  MINIO_REGION: z.string(),
  MINIO_ROOT_USER: z.string(),
  MINIO_ROOT_PASSWORD: z.string(),
  MINIO_BUCKET: z.string(),
  MINIO_PORT: z.coerce.number(),
});

const envSchema = z.discriminatedUnion('NODE_ENV', [prodSchema, devSchema]);

const validatedEnv = envSchema.safeParse(process.env);
if (!validatedEnv.success) {
  console.error('❌ ERROR : Zod validation failed');
  throw new Error(validatedEnv.error.message);
}

const ENV = validatedEnv.data;

console.log('✅ SUCCESS : ENV is valid');

export default ENV;
