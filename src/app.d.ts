// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Locals {}
  // interface PageData {}
  // interface Error {}
  // interface Platform {}
}

import type { PoolClient } from "pg";

declare global {
  namespace App {
    interface Locals {
      dbconn: PoolClient;
    }
  }
}

export {};
