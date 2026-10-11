import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

export async function resolve(specifier, context, defaultResolve) {
  // Alias '@/...' -> '<project_root>/src/...'
  if (specifier.startsWith('@/')) {
    const relative = specifier.slice(2);
    const basePath = path.resolve(process.cwd(), 'src', relative);
    for (const ext of ['', '.ts', '.tsx', '.js', '.mjs', '/index.ts', '/index.js']) {
      const target = basePath + ext;
      if (fs.existsSync(target)) {
        return {
          url: pathToFileURL(target).href,
          shortCircuit: true,
        };
      }
    }
  }

  // next/server -> next/server.js
  if (specifier === 'next/server') {
    return defaultResolve('next/server.js', context);
  }

  // Relative imports without extension
  if ((specifier.startsWith('./') || specifier.startsWith('../')) && !path.extname(specifier)) {
    if (context.parentURL) {
      const parentDir = path.dirname(new URL(context.parentURL).pathname);
      const targetBase = path.resolve(parentDir, specifier);
      for (const ext of ['', '.ts', '.tsx', '.js', '.mjs', '/index.ts', '/index.js']) {
        const target = targetBase + ext;
        if (fs.existsSync(target)) {
          return {
            url: pathToFileURL(target).href,
            shortCircuit: true,
          };
        }
      }
    }
  }

  return defaultResolve(specifier, context);
}
