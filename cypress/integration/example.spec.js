/// <reference types="cypress" />

describe("Test Login", () => {
  it("Test Login (positive case)", () => {
    cy.visit("http://localhost:5000");
    cy.get("#email-address").type("admin@admin.co");
    cy.get("#password").type("passwordngasal");
    cy.get("button[type=submit]").click();
    cy.get(".cy-main-dashboard").should("be.visible");
  });

  it("Test Login (negative case)", () => {
    cy.visit("http://localhost:5000");
    cy.get("#email-address").type("kuda@admin.co");
    cy.get("#password").type("passwordngasal");
    cy.get("button[type=submit]").click();
    cy.get(".cy-login-error").should("be.visible");
  });
});

describe("Coba masuk ke halaman buat PerfReview", () => {
  it("Test Masuk ke halaman performance review", () => {
    // Login dulu
    cy.visit("http://localhost:5000");
    cy.get("#email-address").type("admin@admin.co");
    cy.get("#password").type("passwordngasal");
    cy.get("button[type=submit]").click();
    cy.get(".cy-main-dashboard").should("be.visible");

    // Baru masuk ke halamannya
    cy.visit("http://localhost:5000/performance-review/new");
    cy.get(".cy-create-new-performance-review").should("be.visible");
  });
});
