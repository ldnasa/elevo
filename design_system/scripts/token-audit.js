#!/usr/bin/env node
/**
 * ELEVO Design System - token audit
 *
 * Scans implementation source files for hardcoded visual values that should
 * resolve to a token in tokens.css instead. Exits 1 if any error-level issue
 * is found, 0 otherwise.
 *
 * Usage: node design_system/scripts/token-audit.js
 *
 * Status at generation time: NOT RUN - no implementation files exist yet
 * (design_system/ is the only content in this repo besides the wireframe and
 * handoff docs). Run this after web-build Passo D starts producing HTML/CSS.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const TOKENS_CSS = path.join(__dirname, "..", "tokens.css");

// Directories/files never scanned - the design system itself (tokens, specs,
// showcase) is the source of truth being audited against, not the target.
const ALLOWLIST_PATHS = [
  "design_system",
  "wireframe.html", // structural-only per CLAUDE.md, discarded before implementation
  "node_modules",
  ".git",
];

// Explicit value allowlist: { value, category, reason }
const ALLOWLIST_VALUES = [
  { value: "1px", category: "border-width", reason: "hairline borders are not a token family" },
];

const SOURCE_GLOBS = [".html", ".css", ".js", ".jsx", ".ts", ".tsx"];

function isAllowlistedPath(filePath) {
  const rel = path.relative(ROOT, filePath).replace(/\\/g, "/");
  return ALLOWLIST_PATHS.some((p) => rel === p || rel.startsWith(p + "/"));
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (isAllowlistedPath(full)) continue;
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (SOURCE_GLOBS.includes(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

function parseTokenReference() {
  // Builds a value -> token-name map from tokens.css so we can suggest a replacement.
  const map = new Map();
  if (!fs.existsSync(TOKENS_CSS)) return map;
  const css = fs.readFileSync(TOKENS_CSS, "utf8");
  const re = /--([a-z0-9-]+):\s*([^;]+);/gi;
  let m;
  while ((m = re.exec(css))) {
    const name = `--${m[1]}`;
    const value = m[2].trim().toLowerCase();
    if (!map.has(value)) map.set(value, name);
  }
  return map;
}

const RULES = [
  {
    id: "hex-color",
    severity: "error",
    category: "color",
    pattern: /#[0-9a-f]{3,8}\b/gi,
  },
  {
    id: "rgb-color",
    severity: "error",
    category: "color",
    pattern: /\brgba?\([^)]+\)/gi,
  },
  {
    id: "raw-px-spacing",
    severity: "error",
    category: "spacing",
    pattern: /:\s*-?\d{1,4}px\b/g,
  },
  {
    id: "raw-rem",
    severity: "warning",
    category: "spacing",
    pattern: /:\s*-?\d*\.?\d+rem\b/g,
  },
  {
    id: "transition-all",
    severity: "error",
    category: "motion",
    pattern: /transition\s*:\s*all\b/gi,
  },
  {
    id: "box-shadow-raw",
    severity: "error",
    category: "elevation",
    pattern: /box-shadow\s*:\s*(?!var\()/gi,
  },
  {
    id: "z-index-raw",
    severity: "warning",
    category: "z-index",
    pattern: /z-index\s*:\s*\d+/gi,
  },
];

function isInsideVarDeclaration(line) {
  // Ignore lines that ARE the custom-property declaration itself, e.g. `--space-4: 16px;`
  return /^\s*--[a-z0-9-]+\s*:/i.test(line);
}

function suggestToken(rawValue, tokenMap) {
  const normalized = rawValue.trim().toLowerCase();
  if (tokenMap.has(normalized)) return `var(${tokenMap.get(normalized)})`;
  return null;
}

function auditFile(filePath, tokenMap) {
  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  const issues = [];

  lines.forEach((line, idx) => {
    if (isInsideVarDeclaration(line)) return;
    if (/token-audit-disable-next-line/i.test(lines[idx - 1] || "")) return;

    for (const rule of RULES) {
      rule.pattern.lastIndex = 0;
      let match;
      while ((match = rule.pattern.exec(line))) {
        const raw = match[0].replace(/^[:\s]+/, "");
        const allowlisted = ALLOWLIST_VALUES.find((a) => raw.includes(a.value));
        if (allowlisted) continue;

        const suggestion = suggestToken(raw, tokenMap);
        issues.push({
          line: idx + 1,
          raw,
          category: rule.category,
          severity: rule.severity,
          suggestion: suggestion || (rule.severity === "error"
            ? "No matching token. Add a semantic token or document this value in the allowlist."
            : null),
        });
      }
    }
  });

  return issues;
}

function main() {
  const files = walk(ROOT);
  const tokenMap = parseTokenReference();

  if (files.length === 0) {
    console.log("Token Audit");
    console.log("No implementation source files found outside design_system/.");
    console.log("Status: NOT RUN - no implementation files yet. Re-run after web-build Passo D.");
    process.exit(0);
  }

  console.log("Token Audit");
  console.log(`Scanning ${files.length} file(s)...\n`);

  let totalErrors = 0;
  let totalWarnings = 0;
  let filesWithIssues = 0;

  for (const file of files) {
    const issues = auditFile(file, tokenMap);
    if (issues.length === 0) continue;

    filesWithIssues++;
    console.log(path.relative(ROOT, file));
    for (const issue of issues) {
      const marker = issue.severity === "error" ? "x" : "!";
      const suggestionText = issue.suggestion ? ` -> ${issue.suggestion}` : "";
      console.log(`  ${marker} L${issue.line} ${issue.category} ${issue.raw}${suggestionText}`);
      if (issue.severity === "error") totalErrors++;
      else totalWarnings++;
    }
    console.log("");
  }

  console.log("Summary");
  console.log(`Files scanned:      ${files.length}`);
  console.log(`Files with issues:  ${filesWithIssues}`);
  console.log(`Errors:             ${totalErrors}`);
  console.log(`Warnings:           ${totalWarnings}`);

  process.exit(totalErrors > 0 ? 1 : 0);
}

main();
