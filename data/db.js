const Sequelize = require('sequelize');

const {
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const Comment = sequelize.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user: {
        type: Sequelize.STRING,
        allowNull: false
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Series = sequelize.define('series', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    },
    currentEpisode: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    currentSeason: {
        type: Sequelize.INTEGER
    }
});

Comment.belongsTo(Series);

Comment.sync();
Series.sync();

module.exports = {
    Series,
    Comment
};
