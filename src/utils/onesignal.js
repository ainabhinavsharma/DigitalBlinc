export const initOneSignal = () => {
  if (typeof window !== 'undefined') {
    window.OneSignal = window.OneSignal || [];
    window.OneSignal.push(function() {
      window.OneSignal.init({
        appId: "YOUR_ONESIGNAL_APP_ID", // Replace with your App ID
        safari_web_id: "YOUR_SAFARI_WEB_ID",
        notifyButton: { enable: false },
      });
    });
  }
};

export const sendNotification = async (name) => {
  // Logic to trigger OneSignal notification when the 5-min timer ends
  console.log(`Sending approval notification to ${name}`);
};