# User Permissions Extension

This plugin extends the Strapi Users & Permissions plugin to add an "own data only" option for permissions.

## Features

- Adds an "own data only" checkbox for each permission in the Users & Permissions plugin
- When enabled, users with this permission can only access their own data
- Works with find, findOne, update, and delete operations

## Installation

1. Copy this plugin to your Strapi project's `src/plugins` directory
2. Restart your Strapi server

## Usage

1. Go to Settings > Users & Permissions Plugin > Roles
2. Edit any role
3. For each permission, you'll now see an additional "Own data only" checkbox
4. When enabled, users with this role will only be able to access their own data for that specific permission

## How it works

- For find operations: Automatically filters results to only show records where the user is the owner
- For update/delete operations: Checks if the user owns the record before allowing the operation
- For create operations: Automatically sets the user as the owner of the new record

## Requirements

- Strapi v4.5.3
- Node.js 18.17.0
- npm >= 9.6.0 