import test from "node:test";
import assert from "node:assert/strict";
import { contactSchema } from "../src/schemas/contact.schema.js";

test("accepts valid inquiry and normalizes email", () => {
  const result = contactSchema.safeParse({
    name: "Aarav Sharma", email: "AARAV@example.com",
    company: "Example Systems", industry: "Software",
    message: "I would like to discuss a software project."
  });
  assert.equal(result.success, true);
  assert.equal(result.data.email, "aarav@example.com");
});

test("rejects malformed email", () => {
  const result = contactSchema.safeParse({
    name: "Aarav Sharma", email: "not-an-email",
    message: "This is a sufficiently long message."
  });
  assert.equal(result.success, false);
});

test("rejects too-short messages", () => {
  const result = contactSchema.safeParse({
    name: "Aarav Sharma", email: "aarav@example.com", message: "short"
  });
  assert.equal(result.success, false);
});
