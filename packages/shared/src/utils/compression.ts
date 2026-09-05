import * as zlib from 'zlib';

/**
 * Payload compression helpers for offline sync and data transfer
 */

export function compressJsonToGzip(data: unknown): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const jsonString = JSON.stringify(data);
    zlib.gzip(Buffer.from(jsonString, 'utf-8'), (err, buffer) => {
      if (err) reject(err);
      else resolve(buffer);
    });
  });
}

export function decompressGzipToJson<T>(buffer: Buffer): Promise<T> {
  return new Promise((resolve, reject) => {
    zlib.gunzip(buffer, (err, decompressed) => {
      if (err) reject(err);
      else {
        try {
          const parsed = JSON.parse(decompressed.toString('utf-8'));
          resolve(parsed as T);
        } catch (parseError) {
          reject(parseError);
        }
      }
    });
  });
}
