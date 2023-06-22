import OneSignal from 'react-onesignal';

export default async function runOneSignal() {
  await OneSignal.init({ appId: '59583636-8a5d-4790-9e2a-07e3d38c2b04' });
  OneSignal.showSlidedownPrompt();
}