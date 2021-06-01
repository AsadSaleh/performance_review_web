"use strict";

function generateData() {
  let id = 1;
  let data = [];
  Array.from({ length: 4 }).forEach((_, i) => {
    Array.from({ length: 5 }).forEach((__, j) => {
      data.push({
        id,
        QuestionId: i + 1,
        ChoiceId: j + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      id++;
    });
  });
  return data;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("QuestionChoices", generateData(), {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("QuestionChoices", null, {});
  },
};
