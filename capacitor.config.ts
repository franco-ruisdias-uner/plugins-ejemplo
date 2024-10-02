import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'plugins',
  webDir: 'www',
  plugins:{
    LocalNotifications: {
      smallIcon: "ic_notification",
      iconColor: "#488AFF",
    },
  }
};

export default config;
