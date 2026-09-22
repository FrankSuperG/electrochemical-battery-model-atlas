const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

// Load generator helpers without invoking the mutating CLI entry point.
const source = fs.readFileSync(path.join(__dirname, "models.js"), "utf8").replace(/\nmain\(\);\s*$/, "");
const context = vm.createContext({ require, __dirname, console, process });
vm.runInContext(source, context);
const entries = [
  { slug: "clean", status: "success" },
  { slug: "failed", status: "unreproduced" },
  { slug: "new", status: "not-tested" },
];
const result = context.groupReproductions(entries);
assert.equal(result.groups.success.length, 1);
assert.equal(result.groups.unreproduced.length, 1);
assert.equal(result.groups["not-tested"].length, 1);
assert.equal(context.evidenceLevel(entries[2]), "source-review-only");
assert.equal(context.evidenceLevel({ ...entries[2], evidence_level: "independent-local" }), "source-review-only");
assert.equal(context.licenseRisk("AGPL-3.0-or-later"), "copyleft");
assert.match(context.reproductionStatusText(entries), /1 not-tested entry/);
assert.match(context.reproductionStatusText(entries), /1 successful reproductions/);
console.log("OK: untested entries remain separate from execution evidence and success counts.");
const projects = context.groupProjects([
  { slug: "battmo", project: "battmo", language: ["matlab"] },
  { slug: "battmo-jl", project: "battmo", language: ["julia"] },
  { slug: "other", language: ["python"] },
]);
assert.equal(projects.length, 2);
assert.equal(projects[0][1].length, 2);
assert.equal(projects[0][1][1].slug, "battmo-jl");
console.log("OK: shared projects retain distinct implementation records.");
const readme = fs.readFileSync(path.join(__dirname, "..", "README.md"), "utf8");
const index = readme.split("<!-- MODEL_INDEX_START -->")[1].split("<!-- MODEL_INDEX_END -->")[0];
assert.equal((index.match(/^\| `battmo`\s*\|/gm) || []).length, 1);
assert.doesNotMatch(index, /^\| `battmo-jl`\s*\|/m);
assert.match(index, /\[BattMo\]\(MODELS\/battmo\.md\)/);
console.log("OK: the project index contains one BattMo family entry.");
