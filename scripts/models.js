#!/usr/bin/env node
/*
  models.js

  Minimal tooling for this repo:
  - validate: sanity-check data/models.yaml against repo structure
  - render-readme: (optional) regenerate the README model index table from YAML

  Usage:
    node scripts/models.js validate
    node scripts/models.js render-readme
*/

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const MODELS_YAML = path.join(ROOT, "data", "models.yaml");
const README = path.join(ROOT, "README.md");

const REQUIRED_FIELDS = [
  "slug",
  "name",
  "url",
  "authors_or_org",
  "license",
  "language",
  "family",
  "extensions",
  "focus",
  "last_reviewed",
  "entry",
];

// Keep these conservative but inclusive. Add values as the Zoo grows.
const ALLOWED = {
  family: new Set(["dfn", "p2d", "spm", "spme"]),
  language: new Set(["python", "matlab", "julia", "cpp", "c++"]),
  extensions: new Set(["thermal", "degradation", "mechanics", "" /* allow empty placeholder */]),
  focus: new Set([
    "fast-simulation",
    "framework",
    "research",
    "reproducibility",
    "solver",
    "educational",
    "reference-implementation",
    "finite-difference",
    "jax",
    "openfoam",
    "performance",
    "parameter-inference",
    "optimal-experimental-design",
    "spectral-method",
    "degradation",
    "continuum",
    "control",
    "estimation",
  ]),
};

function readYamlList(filePath) {
  // Minimal YAML reader tailored to data/models.yaml.
  // Supports:
  // - top-level list of objects: "- slug: ..."
  // - indented key-value pairs
  // - inline arrays: [a, b, c]
  // - simple scalars (strings, numbers) treated as strings
  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split(/\r?\n/);

  const entries = [];
  let cur = null;

  const parseInlineArray = (s) => {
    const inner = s.trim().slice(1, -1).trim();
    if (!inner) return [];
    return inner
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  };

  const parseValue = (v) => {
    v = v.trim();
    if (v === "[]") return [];
    if (v.startsWith("[") && v.endsWith("]")) return parseInlineArray(v);
    // strip simple quotes
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      return v.slice(1, -1);
    }
    return v;
  };

  for (const line0 of lines) {
    const line = line0.replace(/\t/g, "  ");
    if (!line.trim() || line.trim().startsWith("#")) continue;

    if (line.startsWith("- ")) {
      // Start a new entry
      if (cur) entries.push(cur);
      cur = {};
      const rest = line.slice(2);
      const m = rest.match(/^([^:]+):\s*(.*)$/);
      if (!m) throw new Error(`Cannot parse line: ${line0}`);
      cur[m[1].trim()] = parseValue(m[2] || "");
      continue;
    }

    if (!cur) throw new Error(`Found key-value before first list item: ${line0}`);

    // Indented key-value
    const m = line.match(/^\s{2,}([^:]+):\s*(.*)$/);
    if (!m) throw new Error(`Cannot parse line: ${line0}`);
    const key = m[1].trim();
    const valRaw = m[2] || "";
    cur[key] = parseValue(valRaw);
  }

  if (cur) entries.push(cur);
  if (!Array.isArray(entries)) throw new Error("Internal error: entries is not an array");
  return entries;
}

function isNonEmptyString(x) {
  return typeof x === "string" && x.trim().length > 0;
}

function isStringArray(x) {
  return Array.isArray(x) && x.every((v) => typeof v === "string");
}

function validate() {
  const entries = readYamlList(MODELS_YAML);
  const errors = [];
  const slugs = new Set();

  for (const [i, e] of entries.entries()) {
    const where = `entry[${i}]${e && e.slug ? ` (${e.slug})` : ""}`;

    // Required fields
    for (const f of REQUIRED_FIELDS) {
      if (!(f in e)) errors.push(`${where}: missing required field '${f}'`);
    }

    // Basic types
    if ("slug" in e && !isNonEmptyString(e.slug)) errors.push(`${where}: slug must be a non-empty string`);
    if ("name" in e && !isNonEmptyString(e.name)) errors.push(`${where}: name must be a non-empty string`);
    if ("url" in e && !isNonEmptyString(e.url)) errors.push(`${where}: url must be a non-empty string`);
    if ("authors_or_org" in e && !isNonEmptyString(e.authors_or_org)) {
      errors.push(`${where}: authors_or_org must be a non-empty string`);
    }
    if ("license" in e && !isNonEmptyString(e.license)) errors.push(`${where}: license must be a non-empty string`);

    for (const key of ["language", "family", "extensions", "focus"]) {
      if (key in e && !isStringArray(e[key])) errors.push(`${where}: ${key} must be an array of strings`);
    }

    // Slug uniqueness
    if (isNonEmptyString(e.slug)) {
      if (slugs.has(e.slug)) errors.push(`${where}: duplicate slug '${e.slug}'`);
      slugs.add(e.slug);
    }

    // Allowed value checks
    const checkAllowed = (field) => {
      if (!(field in e) || !Array.isArray(e[field])) return;
      for (const v of e[field]) {
        const vv = typeof v === "string" ? v.trim().toLowerCase() : v;
        if (!ALLOWED[field].has(vv)) {
          errors.push(`${where}: ${field} has non-allowed value '${v}'. Add it to ALLOWED.${field} in scripts/models.js if intended.`);
        }
      }
    };

    checkAllowed("family");
    checkAllowed("language");
    checkAllowed("extensions");
    checkAllowed("focus");

    // entry path exists
    if (isNonEmptyString(e.entry)) {
      const entryPath = path.join(ROOT, e.entry);
      if (!fs.existsSync(entryPath)) errors.push(`${where}: entry file not found: ${e.entry}`);

      // Encourage MODELS/<slug>.md convention
      const expected = path.join("MODELS", `${e.slug}.md`);
      if (isNonEmptyString(e.slug) && e.entry !== expected) {
        errors.push(`${where}: entry should be '${expected}' (got '${e.entry}')`);
      }
    }

    // last_reviewed is YYYY-MM-DD
    if ("last_reviewed" in e && isNonEmptyString(e.last_reviewed)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(e.last_reviewed)) {
        errors.push(`${where}: last_reviewed should be YYYY-MM-DD (got '${e.last_reviewed}')`);
      }
    }
  }

  if (errors.length) {
    console.error(`Validation failed (${errors.length} problem(s)):`);
    for (const err of errors) console.error(`- ${err}`);
    process.exit(1);
  }

  console.log(`OK: ${entries.length} model(s) validated.`);
}

function renderReadme() {
  const entries = readYamlList(MODELS_YAML);

  // Sort by slug for stable diffs
  entries.sort((a, b) => String(a.slug).localeCompare(String(b.slug)));

  const header = ["Slug", "Name", "Family", "Language", "Extensions", "Best for", "Page"];
  const rows = entries.map((e) => {
    const extensions = Array.isArray(e.extensions) && e.extensions.length ? e.extensions.join(", ") : "—";
    const focus = Array.isArray(e.focus) && e.focus.length ? e.focus.join(", ") : "—";
    const family = Array.isArray(e.family) ? e.family.join("/") : "—";
    const language = Array.isArray(e.language) ? e.language.join(" + ") : "—";
    return [
      `\`${e.slug}\``,
      e.name,
      family.toUpperCase(),
      language,
      extensions,
      focus,
      `[${e.entry}](${e.entry})`,
    ];
  });

  const table = toMarkdownTable([header, ...rows]);

  const start = "<!-- MODEL_INDEX_START -->";
  const end = "<!-- MODEL_INDEX_END -->";
  let readme = fs.readFileSync(README, "utf8");

  if (!readme.includes(start) || !readme.includes(end)) {
    throw new Error(`README.md is missing markers ${start} / ${end}. Add them around the model index table.`);
  }

  const before = readme.split(start)[0] + start;
  const after = readme.split(end)[1];

  const replacement = `\n\n${table}\n\n`;
  readme = before + replacement + end + after;

  fs.writeFileSync(README, readme, "utf8");
  console.log("OK: README model index regenerated from data/models.yaml");
}

function toMarkdownTable(matrix) {
  const widths = [];
  for (const row of matrix) {
    row.forEach((cell, i) => {
      const s = String(cell);
      widths[i] = Math.max(widths[i] || 0, s.length);
    });
  }

  const pad = (s, w) => {
    s = String(s);
    return s + " ".repeat(Math.max(0, w - s.length));
  };

  const lines = [];
  const [head, ...body] = matrix;
  lines.push("| " + head.map((c, i) => pad(c, widths[i])).join(" | ") + " |");
  lines.push("|" + widths.map((w) => "-".repeat(w + 2)).join("|") + "|");
  for (const row of body) {
    lines.push("| " + row.map((c, i) => pad(c, widths[i])).join(" | ") + " |");
  }
  return lines.join("\n");
}

function main() {
  const cmd = process.argv[2];
  if (!cmd || cmd === "-h" || cmd === "--help") {
    console.log("Usage: node scripts/models.js <validate|render-readme>");
    process.exit(0);
  }

  if (cmd === "validate") return validate();
  if (cmd === "render-readme") return renderReadme();

  console.error(`Unknown command: ${cmd}`);
  process.exit(1);
}

main();
