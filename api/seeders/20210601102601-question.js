"use strict";

const questionData = [
  {
    id: 1,
    text: "Work Skills",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    text: "Team Work",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    text: "Communication",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    text: "Time Management",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Questions", questionData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Questions", null, {});
  },
};
