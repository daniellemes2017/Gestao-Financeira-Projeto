import knex from 'knex';
import knexfile from '../../knexfile';

const environment = process.env.NODE_ENV || 'development';
const configOptions = knexfile[environment];

if (!configOptions) {
  throw new Error(`Could not find the configuration for environment: ${environment}`);
}

const connection = knex(configOptions);

export default connection;
