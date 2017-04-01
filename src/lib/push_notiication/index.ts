
import * as gcm from './gcm_push_notification';

export interface PushNotification {
    provider: string;
    payload: Object;
}

export function sendPushNotification (tokens: string[], pushNotification: PushNotification): Promise<any> {

    return gcm.sendPushNotification(tokens, pushNotification);

}