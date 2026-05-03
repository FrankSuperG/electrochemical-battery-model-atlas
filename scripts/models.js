#!/usr/bin/env node
/*
  models.js

  Minimal tooling for this repo:
  - validate: sanity-check data/models.yaml against repo structure
  - render-readme: (optional) regenerate the README model index table from YAML
  - render-reproductions: regenerate reproduction dashboard tables from YAML
  - check-links: verify internal Markdown/HTML file links and anchors
  - check-bib: verify BibTeX key uniqueness and reference-page anchors
  - check-readme: verify README snapshot counts against metadata
  - check: regenerate generated files and run all lightweight checks

  Usage:
    node scripts/models.js validate
    node scripts/models.js render-readme
    node scripts/models.js render-reproductions
    node scripts/models.js check-links
    node scripts/models.js check-bib
    node scripts/models.js check-readme
    node scripts/models.js check
*/

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const MODELS_YAML = path.join(ROOT, "data", "models.yaml");
const REPRODUCTIONS_YAML = path.join(ROOT, "data", "reproductions.yaml");
const REPRODUCTION_TOOLS_YAML = path.join(ROOT, "data", "reproduction-tools.yaml");
const README = path.join(ROOT, "README.md");
const REFERENCES = path.join(ROOT, "REFERENCES.md");
const BIBTEX = path.join(ROOT, "references.bib");
const REPRODUCTIONS_DIR = path.join(ROOT, "REPRODUCTIONS");
const REPRODUCTION_DATE = "2026-05-02";

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

const ALLOWED_LICENSES = new Set([
  "Apache-2.0",
  "BSD-3-Clause",
  "GPL-3.0",
  "MIT",
  "NO-LICENSE",
  "PolyForm-Noncommercial-1.0.0",
]);

const ALLOWED_REPRODUCTION_STATUSES = new Set(["success", "partial", "blocked", "unreproduced"]);
const ALLOWED_IMPLEMENTATION_ROLES = new Set([
  "primary-framework",
  "pybamm-backed-workflow",
  "independent-core-with-pybamm-comparison",
]);

function licenseRisk(license) {
  if (["Apache-2.0", "BSD-3-Clause", "MIT"].includes(license)) return "permissive";
  if (license === "GPL-3.0") return "copyleft";
  if (license === "PolyForm-Noncommercial-1.0.0") return "noncommercial";
  if (license === "NO-LICENSE") return "no-license";
  return "unknown";
}

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

function validateModels() {
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
    if ("license" in e && isNonEmptyString(e.license) && !ALLOWED_LICENSES.has(e.license)) {
      errors.push(`${where}: license has non-allowed value '${e.license}'. Add it to ALLOWED_LICENSES in scripts/models.js if intended.`);
    }
    if ("implementation_role" in e && !ALLOWED_IMPLEMENTATION_ROLES.has(e.implementation_role)) {
      errors.push(`${where}: implementation_role must be one of ${Array.from(ALLOWED_IMPLEMENTATION_ROLES).join(", ")}`);
    }
    if ("implementation_role" in e && !isNonEmptyString(e.implementation_note)) {
      errors.push(`${where}: implementation_note must be a non-empty string when implementation_role is set`);
    }

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
      if (!fs.existsSync(entryPath)) {
        errors.push(`${where}: entry file not found: ${e.entry}`);
      } else {
        const entryText = fs.readFileSync(entryPath, "utf8");
        if (isNonEmptyString(e.url) && !entryText.includes(e.url)) {
          errors.push(`${where}: model page does not include repo URL ${e.url}`);
        }
        for (const heading of ["## Reproducibility", "## References"]) {
          if (!entryText.includes(heading)) errors.push(`${where}: model page missing required heading '${heading}'`);
        }
      }

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
  return entries;
}

function validateReproductions(modelEntries) {
  const entries = readYamlList(REPRODUCTIONS_YAML);
  const errors = [];
  const modelSlugs = new Set(modelEntries.map((e) => e.slug));
  const slugs = new Set();
  const required = [
    "slug",
    "status",
    "language",
    "environment",
    "primary_blocker",
    "likely_next_step",
    "runtime",
    "dependencies",
    "notes",
  ];

  for (const [i, e] of entries.entries()) {
    const where = `reproduction[${i}]${e && e.slug ? ` (${e.slug})` : ""}`;

    for (const f of required) {
      if (!(f in e)) errors.push(`${where}: missing required field '${f}'`);
    }

    if ("slug" in e && !isNonEmptyString(e.slug)) errors.push(`${where}: slug must be a non-empty string`);
    if (isNonEmptyString(e.slug)) {
      if (slugs.has(e.slug)) errors.push(`${where}: duplicate slug '${e.slug}'`);
      slugs.add(e.slug);
      if (!modelSlugs.has(e.slug)) errors.push(`${where}: slug not found in data/models.yaml`);

      const page = path.join(REPRODUCTIONS_DIR, `${e.slug}.md`);
      if (!fs.existsSync(page)) {
        errors.push(`${where}: reproduction page not found: REPRODUCTIONS/${e.slug}.md`);
      } else {
        const pageText = fs.readFileSync(page, "utf8");
        const statusMatch = pageText.match(/- Status: `([^`]+)`/);
        if (!statusMatch) {
          errors.push(`${where}: reproduction page missing '- Status: ` + "`...`' line");
        } else if (statusMatch[1] !== e.status) {
          errors.push(`${where}: reproduction page status '${statusMatch[1]}' does not match data status '${e.status}'`);
        }
      }
    }

    if ("environment_file" in e && isNonEmptyString(e.environment_file)) {
      const environmentPath = path.join(ROOT, e.environment_file);
      if (!fs.existsSync(environmentPath)) {
        errors.push(`${where}: environment file not found: ${e.environment_file}`);
      }
    }

    if ("status" in e && !ALLOWED_REPRODUCTION_STATUSES.has(e.status)) {
      errors.push(`${where}: status must be one of ${Array.from(ALLOWED_REPRODUCTION_STATUSES).join(", ")}`);
    }
  }

  for (const slug of modelSlugs) {
    if (!slugs.has(slug)) errors.push(`data/reproductions.yaml: missing reproduction entry for model slug '${slug}'`);
  }

  if (errors.length) {
    console.error(`Reproduction validation failed (${errors.length} problem(s)):`);
    for (const err of errors) console.error(`- ${err}`);
    process.exit(1);
  }

  console.log(`OK: ${entries.length} reproduction entr${entries.length === 1 ? "y" : "ies"} validated.`);
  return entries;
}

function validate() {
  const modelEntries = validateModels();
  validateReproductions(modelEntries);
}

function formatSlugList(slugs) {
  return slugs.length ? slugs.map((s) => `\`${s}\``).join(", ") : "none";
}

function groupReproductions(entries) {
  const order = ["success", "partial", "blocked", "unreproduced"];
  const groups = Object.fromEntries(order.map((status) => [status, []]));
  for (const entry of entries) {
    if (!groups[entry.status]) groups[entry.status] = [];
    groups[entry.status].push(entry.slug);
  }
  return { order, groups };
}

function evidenceLevel(entry) {
  if (entry.evidence_level) return entry.evidence_level;
  return entry.status === "success" ? "independent-local" : "attempted-local";
}

function reproductionStatusText(entries) {
  const { groups } = groupReproductions(entries);
  return `Reproduction records are maintained in [` +
    `REPRODUCTIONS/](REPRODUCTIONS/). As of ${REPRODUCTION_DATE}, the Atlas has ` +
    `${groups.success.length} successful reproductions, ${groups.unreproduced.length} unreproduced entries, ` +
    `${groups.partial.length} partial entries, and ${groups.blocked.length} blocked entries.`;
}

function implementationRoleText(entries) {
  const labels = {
    "primary-framework": "Primary framework",
    "pybamm-backed-workflow": "PyBaMM-backed workflow",
    "independent-core-with-pybamm-comparison": "Independent core; PyBaMM comparison only",
  };
  const order = {
    "primary-framework": 0,
    "pybamm-backed-workflow": 1,
    "independent-core-with-pybamm-comparison": 2,
  };
  const rows = entries
    .filter((entry) => entry.implementation_role)
    .sort((a, b) => order[a.implementation_role] - order[b.implementation_role] || a.slug.localeCompare(b.slug))
    .map((entry) => [
      `\`${entry.slug}\``,
      labels[entry.implementation_role],
      entry.implementation_note,
    ]);

  return [
    "Use this table to avoid double-counting PyBaMM-backed workflows as independent PDE implementations.",
    "",
    toMarkdownTable([["Entry", "Implementation role", "Note"], ...rows]),
    "",
    "Rule: keep PyBaMM itself as the primary framework entry; keep PyBaMM-backed papers/workflows as separate Atlas entries only when they add a distinct research task, dataset, protocol, or workflow around the framework.",
  ].join("\n");
}

function renderReadme() {
  const entries = readYamlList(MODELS_YAML);

  // Sort by slug for stable diffs
  entries.sort((a, b) => String(a.slug).localeCompare(String(b.slug)));

  const header = ["Slug", "Name", "Family", "Language", "License", "Reuse risk", "Extensions", "Best for", "Page"];
  const displayFamily = (value) => (
    {
      dfn: "DFN",
      p2d: "P2D",
      spm: "SPM",
      spme: "SPMe",
    }[String(value).toLowerCase()] || value
  );
  const displayLanguage = (value) => (
    {
      cpp: "C++",
      "c++": "C++",
      julia: "Julia",
      matlab: "MATLAB",
      python: "Python",
    }[String(value).toLowerCase()] || value
  );
  const rows = entries.map((e) => {
    const extensions = Array.isArray(e.extensions) && e.extensions.length ? e.extensions.join(", ") : "—";
    const focus = Array.isArray(e.focus) && e.focus.length ? e.focus.join(", ") : "—";
    const family = Array.isArray(e.family) ? e.family.map(displayFamily).join("/") : "—";
    const language = Array.isArray(e.language) ? e.language.map(displayLanguage).join(" + ") : "—";
    return [
      `\`${e.slug}\``,
      e.name,
      family,
      language,
      e.license,
      licenseRisk(e.license),
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

  if (fs.existsSync(REPRODUCTIONS_YAML)) {
    const reproductions = readYamlList(REPRODUCTIONS_YAML);
    const reproStart = "<!-- REPRODUCTION_STATUS_START -->";
    const reproEnd = "<!-- REPRODUCTION_STATUS_END -->";
    if (readme.includes(reproStart) && readme.includes(reproEnd)) {
      const reproBefore = readme.split(reproStart)[0] + reproStart;
      const reproAfter = readme.split(reproEnd)[1];
      const reproReplacement = `\n${reproductionStatusText(reproductions)}\n\nStart with the [` +
        `reproduction dashboard](REPRODUCTIONS/SUMMARY.md) for a high-level view, then use the [` +
        `dependency matrix](REPRODUCTIONS/DEPENDENCIES.md) and [` +
        `coverage matrix](REPRODUCTIONS/COVERAGE.md) for exact environments and blockers.\n`;
      readme = reproBefore + reproReplacement + reproEnd + reproAfter;
    }
  }

  const implementationStart = "<!-- IMPLEMENTATION_BASE_START -->";
  const implementationEnd = "<!-- IMPLEMENTATION_BASE_END -->";
  if (readme.includes(implementationStart) && readme.includes(implementationEnd)) {
    const implementationBefore = readme.split(implementationStart)[0] + implementationStart;
    const implementationAfter = readme.split(implementationEnd)[1];
    readme = implementationBefore + `\n${implementationRoleText(entries)}\n` + implementationEnd + implementationAfter;
  }

  fs.writeFileSync(README, readme, "utf8");
  console.log("OK: README model index and reproduction status regenerated");
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

function renderReproductions() {
  const entries = readYamlList(REPRODUCTIONS_YAML);
  const tools = readYamlList(REPRODUCTION_TOOLS_YAML);
  const { order, groups } = groupReproductions(entries);

  const resultRows = order.map((status) => [
    status,
    groups[status].length,
    formatSlugList(groups[status]),
  ]);

  const recommendedRows = [
    [
      "Robust baseline for SPM/SPMe/DFN studies",
      "`pybamm`",
      "Modern dependency stack, active ecosystem, strong documentation, successful command-level run.",
    ],
    [
      "MATLAB DFN framework",
      "`battmo`",
      "Runs in MATLAB R2021b after submodules are available; more suitable than older MATLAB-only snapshots.",
    ],
    [
      "Lightweight DFN/SPMe educational examples",
      "`dfn-scott-moura`, `fastdfn`, `spmet`",
      "Reproduced in Octave 11.1.0 with small or no setup overhead.",
    ],
    [
      "Julia-based DFN/P2D work",
      "`petlion-jl`, `jubat`",
      "`petlion-jl` is cleaner; `jubat` required an include-path patch.",
    ],
    [
      "Python legacy model comparison",
      "`battsimpy`",
      "Reproduced in a legacy Python 2.7 Docker environment.",
    ],
    [
      "Advanced research P2D framework",
      "`mpet`",
      "Reproduced in Docker with Python 3.12 after installing runtime system libraries.",
    ],
    [
      "Fast degradation simulator",
      "`slide`",
      "Independently built and tested in this pass; CTest passed 8/8 unit tests.",
    ],
  ];

  const unreproducedRows = entries
    .filter((entry) => entry.status !== "success")
    .map((entry) => [`\`${entry.slug}\``, entry.status, entry.primary_blocker, entry.likely_next_step]);

  const summary = [
    "# Reproduction Summary",
    "",
    `Date: ${REPRODUCTION_DATE}`,
    "",
    `Scope: ${entries.length} Atlas entries. This summary is generated from \`data/reproductions.yaml\` and records reproduction attempts, including Docker, MATLAB, Octave, Julia, Python, and C++/CMake environments. Successful entries are marked \`independent-local\` when this Atlas pass built or ran them in an independent reproduction environment.`,
    "",
    "## Result",
    "",
    toMarkdownTable([["Status", "Count", "Entries"], ...resultRows]),
    "",
    "## Recommended Starting Points",
    "",
    toMarkdownTable([["Need", "Recommended entry", "Why"], ...recommendedRows]),
    "",
    "## Unreproduced Entries",
    "",
    unreproducedRows.length
      ? toMarkdownTable([["Slug", "Status", "Final blocker", "Likely next step"], ...unreproducedRows])
      : "None.",
    "",
    "## Evidence Files",
    "",
    "- [`COVERAGE.md`](COVERAGE.md): per-entry status matrix.",
    "- [`DEPENDENCIES.md`](DEPENDENCIES.md): software and dependency versions used during reproduction.",
    "- [`PITFALLS.md`](PITFALLS.md): cross-project reproduction pitfalls.",
    "- [`CODE_ISSUES.md`](CODE_ISSUES.md): likely upstream code issues versus environment-only blockers.",
    "- [`LOCAL_PATCHES.md`](LOCAL_PATCHES.md): reproduction patches and shims used during reproduction.",
    "",
  ].join("\n");

  const coverageRows = entries.map((entry) => [
    `\`${entry.slug}\``,
    entry.language,
    entry.status,
    evidenceLevel(entry),
    entry.environment,
    entry.primary_blocker,
  ]);
  const coverage = [
    "# Full Coverage Matrix",
    "",
    "This file tracks reproduction coverage for every Atlas entry. It is generated from `data/reproductions.yaml`.",
    "",
    toMarkdownTable([["Slug", "Language", "Status", "Evidence", "Environment path", "Primary blocker"], ...coverageRows]),
    "",
  ].join("\n");

  const toolRows = tools.map((entry) => [entry.tool, entry.version]);
  const dependencyRows = entries.map((entry) => [
    `\`${entry.slug}\``,
    entry.status,
    entry.runtime,
    entry.environment_file ? `[${entry.environment_file}](${path.relative(REPRODUCTIONS_DIR, path.join(ROOT, entry.environment_file))})` : "—",
    entry.dependencies,
    entry.notes,
  ]);
  const dependencies = [
    "# Reproduction Dependency Matrix",
    "",
    `Date: ${REPRODUCTION_DATE}`,
    "",
    "This file records the software stack used for the reproduction pass. Versions are observed host or container versions, not necessarily the upstream authors' original development versions. It is generated from `data/reproductions.yaml` and `data/reproduction-tools.yaml`.",
    "",
    "## Global Tool Versions",
    "",
    toMarkdownTable([["Tool", "Observed version"], ...toolRows]),
    "",
    "## Per-Entry Dependencies",
    "",
    toMarkdownTable([["Slug", "Status", "Runtime / software", "Recipe", "Key dependencies observed or required", "Notes"], ...dependencyRows]),
    "",
  ].join("\n");

  fs.writeFileSync(path.join(REPRODUCTIONS_DIR, "SUMMARY.md"), summary, "utf8");
  fs.writeFileSync(path.join(REPRODUCTIONS_DIR, "COVERAGE.md"), coverage, "utf8");
  fs.writeFileSync(path.join(REPRODUCTIONS_DIR, "DEPENDENCIES.md"), dependencies, "utf8");
  console.log("OK: reproduction summary, coverage, and dependency matrix regenerated");
}

function checkLinks() {
  const roots = [".", "MODELS", "REPRODUCTIONS"];
  const excludedDirs = new Set([".git", ".upstream", ".envs", "node_modules", "saved_models"]);
  const files = [];
  const collectMarkdownFiles = (dir) => {
    for (const file of fs.readdirSync(dir)) {
      const abs = path.join(dir, file);
      const rel = path.relative(ROOT, abs);
      if (fs.statSync(abs).isDirectory() && excludedDirs.has(file)) continue;
      if (fs.statSync(abs).isDirectory()) {
        collectMarkdownFiles(abs);
      } else if (rel.endsWith(".md")) {
        files.push(rel);
      }
    }
  };

  for (const dir of roots) {
    const absDir = path.join(ROOT, dir);
    if (!fs.existsSync(absDir)) continue;
    collectMarkdownFiles(absDir);
  }

  const errors = [];
  const linkRe = /\[[^\]]+\]\(([^)]+)\)/g;
  const htmlLinkRe = /\b(?:href|src)="([^"]+)"/g;
  const slugifyHeading = (heading) => heading
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_~]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
  const anchorsFor = (targetPath) => {
    const text = fs.readFileSync(targetPath, "utf8");
    const anchors = new Set();
    for (const match of text.matchAll(/<a\s+[^>]*id="([^"]+)"/g)) anchors.add(match[1]);
    for (const match of text.matchAll(/^#{1,6}\s+(.+)$/gm)) anchors.add(slugifyHeading(match[1]));
    return anchors;
  };

  for (const file of files) {
    const text = fs.readFileSync(path.join(ROOT, file), "utf8");
    const checkHref = (rawHref, label) => {
      rawHref = rawHref.replace(/^<|>$/g, "");
      if (!rawHref || /^[a-z]+:/i.test(rawHref) || rawHref.startsWith("mailto:")) return;
      const [hrefPath, anchor] = rawHref.split("#");
      if (!hrefPath && !anchor) return;
      const target = hrefPath
        ? path.resolve(path.dirname(path.join(ROOT, file)), decodeURI(hrefPath))
        : path.join(ROOT, file);
      if (!fs.existsSync(target)) {
        errors.push(`${file}: missing link target ${label}`);
        return;
      }
      if (anchor && fs.statSync(target).isFile() && path.extname(target) === ".md") {
        const anchors = anchorsFor(target);
        if (!anchors.has(decodeURIComponent(anchor))) {
          errors.push(`${file}: missing anchor ${label}`);
        }
      }
    };

    let match;
    while ((match = linkRe.exec(text))) {
      checkHref(match[1], match[1]);
    }
    while ((match = htmlLinkRe.exec(text))) {
      checkHref(match[1], match[0]);
    }
  }

  if (errors.length) {
    console.error(`Markdown/HTML link check failed (${errors.length} problem(s)):`);
    for (const err of errors) console.error(`- ${err}`);
    process.exit(1);
  }

  console.log("OK: internal Markdown/HTML file links and anchors exist.");
}

function checkBib() {
  const bib = fs.readFileSync(BIBTEX, "utf8");
  const references = fs.readFileSync(REFERENCES, "utf8");
  const modelEntries = readYamlList(MODELS_YAML);
  const keys = Array.from(bib.matchAll(/@\w+\{([^,\s]+),/g)).map((match) => match[1]);
  const duplicates = keys.filter((key, index) => keys.indexOf(key) !== index);
  const errors = [];

  if (duplicates.length) {
    errors.push(`Duplicate BibTeX keys: ${Array.from(new Set(duplicates)).join(", ")}`);
  }

  for (const key of keys) {
    if (!references.includes(`id="ref-${key}"`)) {
      errors.push(`REFERENCES.md missing unified citation anchor for BibTeX key '${key}'`);
    }
  }

  const anchorKeys = Array.from(references.matchAll(/id="ref-([^"]+)"/g)).map((match) => match[1]);
  for (const key of anchorKeys) {
    if (!keys.includes(key)) {
      errors.push(`REFERENCES.md has anchor 'ref-${key}' but references.bib has no matching key`);
    }
  }

  for (const entry of modelEntries) {
    const rowPrefix = `| [\`${entry.slug}\`](${entry.entry}) | ${entry.name} |`;
    if (!references.includes(rowPrefix)) {
      errors.push(`REFERENCES.md model-specific table missing row for '${entry.slug}' / '${entry.name}'`);
    }
  }

  if (errors.length) {
    console.error(`BibTeX/reference validation failed (${errors.length} problem(s)):`);
    for (const err of errors) console.error(`- ${err}`);
    process.exit(1);
  }

  console.log(`OK: ${keys.length} BibTeX key(s) validated.`);
}

function checkReadmeSnapshot() {
  const readme = fs.readFileSync(README, "utf8");
  const modelEntries = readYamlList(MODELS_YAML);
  const reproductionEntries = readYamlList(REPRODUCTIONS_YAML);
  const successCount = reproductionEntries.filter((entry) => entry.status === "success").length;
  const unreproducedCount = reproductionEntries.filter((entry) => entry.status === "unreproduced").length;
  const errors = [];

  const expectedSnippets = [
    `Models indexed: ${modelEntries.length}`,
    `models-${modelEntries.length}-`,
    `Successful reproductions: ${successCount}`,
    `reproduced-${successCount}%2F${modelEntries.length}`,
    `Model entries | ${modelEntries.length} public model repositories or workflows.`,
    `Successful reproductions | ${successCount} entries with command-level evidence.`,
    `Unreproduced after targeted attempts | ${unreproducedCount} entries with documented blockers.`,
  ];

  for (const snippet of expectedSnippets) {
    if (!readme.includes(snippet)) errors.push(`README.md snapshot/count missing expected text: ${snippet}`);
  }

  if (errors.length) {
    console.error(`README snapshot validation failed (${errors.length} problem(s)):`);
    for (const err of errors) console.error(`- ${err}`);
    process.exit(1);
  }

  console.log("OK: README snapshot counts match metadata.");
}

function main() {
  const cmd = process.argv[2];
  if (!cmd || cmd === "-h" || cmd === "--help") {
    console.log("Usage: node scripts/models.js <validate|render-readme|render-reproductions|check-links|check-bib|check-readme|check>");
    process.exit(0);
  }

  if (cmd === "validate") return validate();
  if (cmd === "render-readme") return renderReadme();
  if (cmd === "render-reproductions") return renderReproductions();
  if (cmd === "check-links") return checkLinks();
  if (cmd === "check-bib") return checkBib();
  if (cmd === "check-readme") return checkReadmeSnapshot();
  if (cmd === "check") {
    renderReproductions();
    renderReadme();
    validate();
    checkLinks();
    checkBib();
    return checkReadmeSnapshot();
  }

  console.error(`Unknown command: ${cmd}`);
  process.exit(1);
}

main();
