import Group from './model';
import { IGroup } from './model';

export default class ActivityRepository {
    constructor() {
    }

    /**
     * Finds activity by id
     * @param {string} id - id of the activity
     * @param {Function} completion - Function that will execute after the query, called completion(err, activity)
     */
    public static findById(id: string, completion: Function): void {
        Group.findById(id)
            .exec()
            .then((activity) => {
                completion(null, activity);
            })
            .catch((err) => {
                completion(err);
            });
    }


    /**
     * Finds all groups for authenticated user
     */
    public static findAll(userId: string, completion: Function): void {
        Group.find({members: userId})
            .exec()
            .then((activities) => {
                completion(null, activities);
            })
            .catch((err) => {
                completion(err);
            });
    }

    /**
     * Create group
     * @param {IGroup} group - group object to save
     * @param (creatorId) string - id of the user doing the create request
     * @param {Function} completion - Function that will execute after the query, called completion(err, group)
     */
    public static create(group: IGroup, creatorId: string, completion: Function): void {
        let newGroup = new Group(group);
        newGroup.members.push(creatorId);
        newGroup.admins.push(creatorId);
        newGroup.owner = creatorId;
        newGroup.save()
            .then((savedGroup) => {
                completion(null, savedGroup);
            })
            .catch((err) => {
                completion(err);
            });
    }

}


