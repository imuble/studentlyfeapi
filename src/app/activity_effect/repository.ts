import ActivityEffect from './model';
import { IActivityEffect } from  './model';
import UserRepository from '../user/repository'


export default class ActivityEffectRepository {
    constructor() {
    }

    /**
     * Finds activityEffect by id
     * @param {string} id - id of the activityEffect
     * @param {Function} completion - Function that will execute after the query, called completion(err, activity)
     */
    public static findById(id: string, completion: Function): void {
        ActivityEffect.findById(id).exec()
            .then((activityEffect) => {
                completion(null, activityEffect);
            })
            .catch((err) => {
                completion(err);
            });
    }


    /**
     * Finds all activityEffects
     * @param {Function} completion - Function that will execute after the query, called completion(err, activityEffect)
     */
    public static findAll(completion: Function): void {
        ActivityEffect.find({}).exec()
            .then((activityEffects) => {
                completion(null, activityEffects);
            })
            .catch((err) => {
                completion(err);
            });
    }

    /**
     * Create activityEffect
     * @param {IActivityEffet} activityEffect - activityEffect object to save
     * @param (userId) string - id of the user doing the create request
     * @param {Function} completion - Function that will execute after the query, called completion(err, activityEffect)
     */
    public static create(activityEffect: IActivityEffect, userId: string, completion: Function): void {

        UserRepository.findById(userId, (err, user) => {
            if(err) return completion(err, null);
            if(!user) return completion("404");
            if (user.isAdmin) {
                let newActivityEffect = new ActivityEffect(activityEffect);
                newActivityEffect.save()
                    .then((savedActivityEffect) => {
                        completion(null, savedActivityEffect);
                    })
                    .catch((err) => {
                        completion(err);
                    });
            }
            else {
                return completion("401");
            }
        });
    }
}