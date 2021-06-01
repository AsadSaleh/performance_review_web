"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Question.belongsToMany(models.PerformanceReview, {
        through: "PerformanceReviewAnswer",
      });
      Question.hasMany(models.PerformanceReview);
      Question.belongsToMany(models.Choice, {
        through: "QuestionChoice",
      });
      // define association here
    }
  }
  Question.init(
    {
      text: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
