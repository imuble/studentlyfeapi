import Activity from './model';
import { IActivity } from './model';
import UserRepository from '../user/repository'


export default class ActivityRepository {
    constructor() {
    }

    /**
     * Finds activity by id
     * @param {string} id - id of the activity
     * @param {Function} completion - Function that will execute after the query, called completion(err, activity)
     */
    public static findById(id: string, completion: Function): void {
        Activity.findById(id)
            .populate('selfEffects.activityEffects targetEffects.activityEffects successFactors.attributes')
            .exec()
            .then((activity) => {
                completion(null, activity);
            })
            .catch((err) => {
                completion(err);
            });
    }


    /**
     * Finds all activities
     * @param {string} id - id of the activity
     * @param {Function} completion - Function that will execute after the query, called completion(err, activity)
     */
    public static findAll(completion: Function): void {
        Activity.find({})
            .populate('selfEffects.activityEffects targetEffects.activityEffects successFactors.attributes')
            .exec()
            .then((activities) => {
                completion(null, activities);
            })
            .catch((err) => {
                completion(err);
            });
    }

    /**
     * Create activity
     * @param {IActivity} activity - activity object to save
     * @param (userId) string - id of the user doing the create request
     * @param {Function} completion - Function that will execute after the query, called completion(err, activity)
     */
    public static create(activity: IActivity, userId: string, completion: Function): void {

        UserRepository.findById(userId, (err, user) => {
            if(err) return completion(err, null);
            if(!user) return completion("404");
            if (user.isAdmin) {
                let newActivity = new Activity(activity);
                newActivity.save()
                    .then((savedActivity) => {
                        completion(null, savedActivity);
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


    /**
     * Delete activity
     * @param {IActivity} activity - activity object to delete
     * @param (userId) string - id of the user doing the create request
     * @param {Function} completion - Function that will execute after the query, called completion(err, deletedActivity)
     */
    public static deleteActivity(id: string, userId: string, completion: Function): void {

        UserRepository.isAdminAsync(userId, (admin) => {
            if(!admin) return completion("403");
            Activity.findByIdAndRemove(id, (err, deletedActivity) => {
                if (err) completion("500");
                else if(!deletedActivity)  completion("404");
                else {
                    completion(null, deletedActivity);

                }
            });

        });
    }
}


