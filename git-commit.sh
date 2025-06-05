#!/bin/bash

# Add all changes
git add .

# Create commit with message
git commit -m "feat(dashboard): update trainer dashboard UI and components

- Update quick actions buttons
- Add today's training sessions list
- Add active trainee statistics
- Improve layout and styling"

# Show status after commit
git status
