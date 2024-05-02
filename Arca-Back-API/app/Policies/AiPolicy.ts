import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class AiPolicy extends BasePolicy {

	public async create(user: User) {
		return (user.role === 'admin'||user.role === 'user'||user.role === 'superuser')
	}
}
