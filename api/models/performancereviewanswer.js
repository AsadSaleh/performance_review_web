"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PerformanceReviewAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PerformanceReviewAnswer.init(
    {
      PerformanceReviewId: DataTypes.INTEGER,
      QuestionId: DataTypes.INTEGER,
      ChoiceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PerformanceReviewAnswer",
    }
  );
  return PerformanceReviewAnswer;
};
