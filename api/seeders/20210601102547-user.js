"use strict";

const userData = [
  {
    name: "John Doe",
    email: "aas@fljdks.co",
    department: "Engineering",
    city: "depok",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Asad",
    email: "asad@infradigital.io",
    department: "CEO",
    city: "Jakarta",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Reynaldi Riva",
    email: "boy@keren.com",
    department: "Director",
    city: "Pengadegan",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Billy",
    email: "billy@keren.com",
    department: "Financial Director",
    city: "Pengadegan",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", userData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
