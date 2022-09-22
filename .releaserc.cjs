module.exports = {
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/changelog", {
      "changelogFile": "CHANGELOG.md",
    }],
    "@semantic-release/npm",
    ["@semantic-release/git", {
      "assets": ["package.json", "CHANGELOG.md"],
      "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
    }],
    ["@semantic-release/github", {
      "assets": [
        { "path": "dist/franklin-web-library.esm.js", "label": "Franklin Web Library ESM" },
        { "path": "dist/franklin-web-library.esm.min.js", "label": "Franklin Web Library ESM (Minified)" },
        { "path": "dist/franklin-web-forms.esm.js", "label": "Franklin Web Forms ESM" },
        { "path": "dist/franklin-web-forms.esm.min.js", "label": "Franklin Web Forms ESM (Minified)" },
      ]
    }]
  ],
  branches: ['main'],
};
