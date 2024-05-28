/** @type {import('next').NextConfig} */

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
      },
      webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
      ) => {
        config.externals.push({ canvas: 'commonjs canvas' })
        return config
      },
      images: {
        domains: ['storage.googleapis.com','res.cloudinary.com'],
      },
      
};


export default nextConfig;