import { UserModel } from './model';

export class UserRepository {
	constructor() {
	}

	public findById (id: string): UserModel {
		const user: UserModel = {
			id: '123',
			username: 'Simen',
			password: 'someHashValue'
		};

		return user;
	}
	public create (user: UserModel): void {
	}
}