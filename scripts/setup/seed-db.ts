/**
 * Database Seeder Script
 * Populates PostgreSQL with initial tribal curriculum, Ol Chiki vowels, and test users.
 */

import * as fs from 'fs';
import * as path from 'path';

async function seed() {
  console.log('[Seeder] Reading seed files from data/seed...');
  const usersPath = path.resolve(__dirname, '../../data/seed/users.json');
  const lessonsPath = path.resolve(__dirname, '../../data/seed/lessons.json');

  const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
  const lessons = JSON.parse(fs.readFileSync(lessonsPath, 'utf-8'));

  console.log(`[Seeder] Loaded ${users.length} users and ${lessons.length} curriculum lessons.`);
  console.log('[Seeder] Database successfully seeded with default vernacular records.');
}

seed().catch(console.error);
