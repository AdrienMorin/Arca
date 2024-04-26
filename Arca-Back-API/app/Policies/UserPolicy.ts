import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
	public async viewList(user: User) {
		return user.role === 'admin'
	}
	public async view(user: User) {
		return user.role === 'admin'
	}
	public async createUser(user: User) {
		return user.role === 'admin' || user.role === 'superuser'
	}
	public async createAdmin(user: User) {
		return user.role === 'superuser'
	}
	public async update(user: User) {
		return user.role === 'admin'
	}
	public async delete(user: User) {
		return user.role === 'admin'
	}
	public async changePasswordById(user: User) {
		return user.role === 'superuser'
	}
	public async changePasswordByEmail(user: User) {
		return user.role === 'superuser'
	}
}
