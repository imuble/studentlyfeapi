import User from './model';
import PerformedActivity from '../performed_activity/model';
import { IUser } from './model';
import { IPerformedActivity } from '../performed_activity/model';

export default class UserRepository {
	constructor() {
	}

	private static defaultPopulateQuery = {
		path: 'performedActivities attributes.key',
		select: '-__v -_id'
	}

	public static pushPerformedActivity (userId: string, performedActivity: IPerformedActivity, completion: Function): void {
		let newPerformedActivity = new PerformedActivity(performedActivity);
		newPerformedActivity.save( (err, savedPerformedActivity) => {
			if (err) {
				return completion(err);
			}
			User.findByIdAndUpdate(userId, {$addToSet: {performedActivities: savedPerformedActivity._id}}).exec( () => {
				if (err) {
					return completion(err);
				}

				return completion(null);
			});
		});
	}

    public static removePerformedActivity(userId: string, performedActivityId: string, completion: Function): void {
		PerformedActivity.findByIdAndRemove(performedActivityId).exec( (err) => {
			if (err) {
				console.log(err);
			}
			User.findByIdAndUpdate(userId, {$pull: {performedActivities: performedActivityId}}, (err) => {
				if (err) {
					console.log(err);
					completion(err);
				}
				completion(null);
			});
		});
    }

	/**
	 * Finds a specified user
	 * @param {string} id - id of the user
	 * @param {Function} completion - (OPTIONAL) Function that will execute after the query, called completion(err, user)
	 */
	public static findById(id: string, completion?: Function): void {
		return User.findById(id).exec(completion);
	}

	/**
	 * Finds a specified user
	 * @param {string} id - id of the user
	 * @param {Function} completion - (OPTIONAL) Function that will execute after the query, called completion(err, user)
	 */
	public static findByIdAndPopulate(id: string, populateQuery: any, completion?: Function): void {
		let query = populateQuery;
		if (!populateQuery) {
			query = UserRepository.defaultPopulateQuery;
		}
		return User.findById(id).populate(query).exec(completion);
	}

	/**
	 * Finds a specified user
	 * @param {string} id - id of the user
	 * @param {Function} completion - (OPTIONAL) Function that will execute after the query, called completion(err, user)
	 */
	public static findByFbId(fbId: string, completion?: Function): void {
		return User.findOne({fbId: fbId}).exec(completion);
	}

	/**
	 * Finds a specified user
	 * @param {IUser} user - user object to save
	 * @param {Function} completion - (OPTIONAL) Function that will execute after the query, called completion(err, user)
	 */
	public static create(user: IUser, completion?: Function): void {
		let newUser = new User(user);
		newUser.isAdmin = true;
		return newUser.save(completion);
	}
}