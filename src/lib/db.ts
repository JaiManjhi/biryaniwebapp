import mongoose from 'mongoose';

/* ═══════════════════════════════════════════════════════
   MongoDB Connection — Cached singleton pattern
   
   Prevents connection pool exhaustion in serverless
   environments and during Next.js HMR hot reloads.
   ═══════════════════════════════════════════════════════ */

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable in .env.local'
  );
}

/* Global cache to survive HMR in development */
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: typeof import('mongoose') | null;
    promise: Promise<typeof import('mongoose')> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
