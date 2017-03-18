import UserRepository from '../user/repository';
import { IPerformedActivity } from './model';
import PerformedActivity from './model';

export default class AttributeRepository {
	constructor() {
	}

    /**
	 * Finds all attributes
     * @param {string} userId - userId
	 * @param {Function} completion - Function that will execute after the query, called completion(err, attributes)
	 */
    public static findAllPerformedActiviesForUser(userId: string, completion: Function): void {
        UserRepository.findByIdAndPopulate(userId, {
            path: 'performedActivities',
            select: '-_id'
        }, (err, user) => {
            completion(err, user.performedActivities);
        });
    }
}