import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class PersonPolicy extends BasePolicy {
    public async viewList(user: User) {
		return (user.role === 'admin'||user.role === 'user'||user.role === 'superuser')
	} 
	public async view(user: User) {
		return (user.role === 'admin'||user.role === 'user'||user.role === 'superuser')
	}
	public async create(user: User) {
		return (user.role === 'admin'||user.role === 'superuser')
	}
	public async update(user: User) {
		return (user.role === 'admin'||user.role === 'superuser')
	}

}
