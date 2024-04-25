import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class DocumentPolicy extends BasePolicy {
    public async viewList(user: User) {
		return (user.role === 'admin'||user.role === 'user'||user.role === 'superUser')
	} 
	public async view(user: User) {
		return (user.role === 'admin'||user.role === 'user'||user.role === 'superUser')
	}
	public async create(user: User) {
		return (user.role === 'admin'||user.role === 'user'||user.role === 'superUser')
	}
	public async update(user: User) {
		return (user.role === 'admin'||user.role === 'user'||user.role === 'superUser')
	}
	public async delete(user: User) {
		return (user.role === 'admin'||user.role === 'user'||user.role === 'superUser')
	}
}
