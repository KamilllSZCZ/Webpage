#!/usr/bin/env bash
# Simple deploy helper for GitHub Pages
set -e
if [ -z "$(git status --porcelain)" ]; then
  echo "Working tree clean, proceeding..."
else
  echo "Please commit your changes before deploying."; exit 1
fi
BRANCH=gh-pages
BUILD_DIR=.
# Exclude patterns for files we don't want in the site branch
EXCLUDE=(".git" ".github" "README.md" "README_DEPLOY.md" "deploy.sh")

# Create a temporary directory, copy site files there excluding EXCLUDE patterns
TMPDIR=$(mktemp -d)
for f in * .*; do
  skip=false
  for ex in "${EXCLUDE[@]}"; do
    if [[ "$f" == "$ex" ]]; then skip=true; break; fi
  done
  if [[ "$f" == "." || "$f" == ".." ]]; then skip=true; fi
  if [ "$skip" = false ]; then
    cp -r --preserve=mode,timestamps "$f" "$TMPDIR/" 2>/dev/null || true
  fi
done

# Create orphan branch and push contents of TMPDIR
git checkout --orphan $BRANCH
rm -rf ./*
cp -r $TMPDIR/* .
rm -rf "$TMPDIR"

git --work-tree=. add --all
if git --work-tree=. rev-parse --verify --quiet HEAD >/dev/null; then
  git --work-tree=. commit -m "Deploy site"
else
  git --work-tree=. commit -m "Initial deploy"
fi

git push origin $BRANCH --force
# Return to previous branch
git checkout -

echo "Deployed to branch $BRANCH"