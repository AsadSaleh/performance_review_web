"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PerformanceReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PerformanceReview.belongsTo(models.User);
      PerformanceReview.belongsToMany(models.Question, {
        through: "PerformanceReviewAnswer",
      });
      // Trick to query "question" from "performance review" (or vice versa)
      // PerformanceReview.hasMany(models.Question);
    }
  }
  PerformanceReview.init(
    {
      TargetEmployeeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      ReviewerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PerformanceReview",
    }
  );
  return PerformanceReview;
};
