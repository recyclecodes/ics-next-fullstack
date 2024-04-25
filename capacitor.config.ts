import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'ics-next-fullstack',
  webDir: 'out',
  server: {
    androidScheme: 'https',
  },
};

export default config;
