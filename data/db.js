const Sequelize = require('sequelize');

const db = 'dbc4vkinnu1';
const user = 'c4vkinnu';
const pass = 'Salasana123';

const sequelize = new Sequelize(db, user, pass, {
    host: 'mydb.tamk.fi',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const Comment = sequelize.define('comment', {
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

Series.hasMany(Comment);

Comment.sync();
Series.sync();

module.exports = {
    Series,
    Comment
};
