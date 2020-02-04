import Sequelize from 'sequelize'
import pkg from '../../package.json'

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')
export const sqlDB = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: false,
  }
)

export const User = sqlDB.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  googleId: {
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  tried: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  },
  liked: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  },
  tasteProfile: {
    //Might need to change later?
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  },
})

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => sqlDB.close())
}