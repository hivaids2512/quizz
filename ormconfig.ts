import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const baseOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: 'Z',
  synchronize: false,
  dropSchema: false,
  entities: ['../src/shared/entities/*.entity.ts'],
};

const defaultOptions: DataSourceOptions = {
  ...baseOptions,
  type: 'postgres',
  migrationsRun: true,
  logging: true,
  migrationsTableName: '__migrations',
  migrations: ['../migrations/**/*.ts'],
};


export default new DataSource(defaultOptions);
