import { test } from '@japa/runner'

test('login wrong credentials', async ({ client }) => {
    const response = await client.post('/api/auth/login').json({
        email: 'userdoesntexists@nomail.com',
        password: 'password'
    })
    response.assertStatus(400)
})
