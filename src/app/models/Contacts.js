import Sequelize, { Model } from 'sequelize';

class Contacts extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        fone: Sequelize.STRING,
        birth_date: Sequelize.DATE,
        address: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Contacts;
