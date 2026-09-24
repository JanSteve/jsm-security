#!/usr/bin/env bash

# JSM Security Automated GitHub Sync Script
set -e

echo "🔍 Checking repository status..."
git_status=$(git status --porcelain)

if [ -z "$git_status" ]; then
  echo "✅ Working tree is clean. Checking for unpushed commits..."
  unpushed=$(git log origin/main..HEAD 2>/dev/null || true)
  if [ -n "$unpushed" ]; then
    echo "🚀 Pushing unpushed commits to origin main..."
    git push origin main
    echo "✅ Successfully pushed to GitHub!"
  else
    echo "✨ Everything is already up-to-date with GitHub."
  fi
  exit 0
fi

echo "📦 Staging changes..."
git add -A

commit_msg="${1:-"chore: automated update $(date '+%Y-%m-%d %H:%M:%S IST')"}"
echo "📝 Committing with message: '$commit_msg'..."
git commit -m "$commit_msg"

echo "🚀 Pushing to GitHub (origin/main)..."
git push origin main

echo "🎉 All updates successfully synced to GitHub!"
