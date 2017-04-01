
import { PushNotification } from './';
import * as Gcm from 'node-gcm';

let apiKey = "AIzaSyAwBfWHsVOrMg8b7O1WAw9whqHn3jZG4lc";

export function sendPushNotification(tokens: string[], pushNotification: PushNotification): Promise<any> {
    return new Promise((resolve, reject) => {
        if (!tokens || tokens.length === 0) {
            reject();
        }
        let message = new Gcm.Message();
        message.addData(pushNotification.payload);
        let sender = new Gcm.Sender(apiKey);
        sender.send(message, {registrationTokens: tokens}, (err, res) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(res);
        })
    });
}