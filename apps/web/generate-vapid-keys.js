const webpush = require('web-push');
const vapidKeys = webpush.generateVAPIDKeys();
const fs = require('fs');

fs.writeFileSync('./certificates/vapid-keys.json', JSON.stringify(vapidKeys));
console.log('VAPID keys generated successfully!');
console.log('Please copy the following keys to your .env file:');
console.log("--------------------------------------------");
console.log(`NEXT_PUBLIC_VAPID_PUBLIC_KEY=${vapidKeys.publicKey}`);
console.log(`VAPID_PRIVATE_KEY=${vapidKeys.privateKey}`);