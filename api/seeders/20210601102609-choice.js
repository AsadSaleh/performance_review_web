"use strict";

const choiceData = [
  {
    id: 1,
    text: "Poor",
    value: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    text: "Bad",
    value: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    text: "Okay",
    value: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    text: "Good",
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    text: "Excellent",
    value: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Choices", choiceData, {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Choices", null, {});
  },
};
