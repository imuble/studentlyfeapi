import User from './model';
import PerformedActivity from '../performed_activity/model';
import { IUser } from './model';
import { IPerformedActivity } from '../performed_activity/model';
import { IAttribute } from '../attribute/model';
import AttributeModel from '../attribute/model';
export default class UserRepository {
	constructor() {
	}

	private static defaultPopulateQuery = {
		path: 'performedActivities attributes.attribute',
		select: '-__v'
	}

	/**
	 * Takes a query of increments/decrements on the user attributes.
	 * @param {string} id - id of the user
	 * @param {Array} changeList - list of changes: has {condition: string, change: number, attribute: string}
	 * @param {Function} completion - (OPTIONAL) Function that will execute after the query, called completion(err, user)
	 */
	public static doChangeOnAttributeForUser(userId: string, attribute: string, value: number, completion: Function) {
		User.update({ '_id': userId, 'attributes.attribute': attribute }, { $inc: { 'attributes.$.value': value } })
			.exec(completion)
	}

	public static addAttributeToAllUsers(attributeId: string, defaultValue: number = 0, completion: Function) {
		User.update({}, { $push: { attributes: { attribute: attributeId, value: defaultValue } } }, { multi: true }).exec(completion);
	}

	public static setPushToken(userId: string, token: string, completion: Function) {
		User.findByIdAndUpdate(userId, {$set: {pushToken: token}}, completion);
	}

	public static setAllDefaultAttributesForUser (userId: string, completion: Function) {
		AttributeModel.find({}).then( (attributes) => {
			let attributeList = [];
			attributes.forEach ( (attr) => {
				attributeList.push( {
					attribute: attr._id,
					value: attr.defaultValue || 0
				});
			}) ;
			User.findByIdAndUpdate(userId, {$pushAll: {attributes: attributeList}}, {new: true}).then( (updatedUser) => {
				completion(null, updatedUser);
			});
		}).catch( (err) => {
			completion(err);
		});
	}

	public static getAllPushTokens(completion) {
		let tokens = [];

		User.find({}, (err, users) => {
			if (err) {
				return completion(err);
			}
			users.forEach( (user) => {
				if (user.pushToken) {
					tokens.push(user.pushToken);
				}
			});
			completion(null, tokens);
		});
	}

	public static pushPerformedActivity(userId: string, performedActivity: IPerformedActivity, completion: Function): void {
		let newPerformedActivity = new PerformedActivity(performedActivity);
		newPerformedActivity.save((err, savedPerformedActivity) => {
			if (err) {
				return completion(err);
			}
			User.findByIdAndUpdate(userId, { $addToSet: { performedActivities: savedPerformedActivity._id } }).exec(() => {
				if (err) {
					return completion(err);
				}

				return completion(null);
			});
		});
	}

	public static removePerformedActivity(userId: string, performedActivityId: string, completion: Function): void {
		PerformedActivity.findByIdAndRemove(performedActivityId).exec((err) => {
			if (err) {
				console.log(err);
			}
			User.findByIdAndUpdate(userId, { $pull: { performedActivities: performedActivityId } }, (err) => {
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
		return User.findOne({ fbId: fbId }).exec(completion);
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

	public static isAdminAsync(userId: string, completion: Function) {
		UserRepository.findById(userId, (err, user) => {

			if (err) {
				return completion(false);
			}

			if (!user || !user.isAdmin) {
				return completion(false);
			}

			return completion(true);
		});
	}
}