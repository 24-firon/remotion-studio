
import fs from 'fs-extra';
import path from 'path';

// THE ASSET BRIDGE
// Copies shared assets (models, fonts) to web and video public folders.
// Run this before dev or build.

const ASSETS_SOURCE = path.join(process.cwd(), 'packages/assets/public');
const TARGETS = [
  path.join(process.cwd(), 'apps/web/public/shared'),
  path.join(process.cwd(), 'apps/video/public/shared'),
];

async function sync() {
  console.log('🔄 Syncing Shared Assets...');

  if (!fs.existsSync(ASSETS_SOURCE)) {
    console.warn('⚠️ No shared assets folder found at packages/assets/public');
    return;
  }

  for (const target of TARGETS) {
    await fs.ensureDir(target);
    await fs.copy(ASSETS_SOURCE, target, { overwrite: true });
    console.log(`✅ Synced to: ${target}`);
  }
}

sync().catch(console.error);
