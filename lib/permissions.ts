/** Role helpers — roles are strings in SQLite (see User.role). */

export function isAdmin(role: string | undefined): boolean {
  return role === 'ADMIN';
}

export function isTrainer(role: string | undefined): boolean {
  return role === 'TRAINER' || role === 'ADMIN';
}
