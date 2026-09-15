# Versioning Policy

This website uses a lightweight form of [semantic versioning](https://semver.org/) for meaningful production releases. Versions do not represent every deployment or content update.

## Major Releases

Increment the major version for a new generation of the website:

- site-wide redesigns
- fundamental information-architecture changes
- major technology or content-model replacements
- intentionally removing important features or routes

Example `3.0.0` → `4.0.0`

## Minor Releases

Increment the minor version for a substantial new capability or a coherent bundle of related features.

- search
- RSS
- a new content section
- a significant navigation or discovery feature

Related features should be grouped into one release rather than given separate minor versions.

Example `3.0.0` → `3.1.0`

## Patch Releases

Increment the patch version for meaningful user-facing fixes:

- broken links or redicrects
- accessibility problems
- mobile layout bugs
- theme or interaction bugs
- incorrect metadata

Related fixes should be grouped when practical.

Example `3.1.0` → `3.1.1`

## Changes that do not require a version

Ordinary content and internal maintenance can be deployed without updating the version:

- new Leetcode solutions
- project write-ups
- thoughts and articles
- readingstatus updates
- personal information updates
- minor spelling corrections
- dependency updates without visible effects
- refactoring without behavioural changes

A large content launch may qualify as a minor release when it introduces a new capability or section.

## Release Process

1. Collect notable unreleased changes
2. Group related work into a release
3. Choose major, minor or patch based on user impact
4. Add the changelog entry immediately before release
5. Set the release date when the release is deployed
6. Do not rewrite published releases except to correct factual errors
