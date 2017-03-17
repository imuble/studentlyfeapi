import { UserModel } from './model';

export class UserRepository {
	constructor() {
	}

	public findById (id: string): UserModel {
		const user: UserModel = {
			id: id,
			username: 'Simen',
			fbId: 'wtf'
		};

		return user;
	}
	public create (user: UserModel): void {
	}
}