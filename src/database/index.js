import 'dotenv/config';
import Sequelize from 'sequelize';
import User from '../app/models/User';
import Contacts from '../app/models/Contacts';

import databaseConfig from '../config/database';

const models = [User, Contacts];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
