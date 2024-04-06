import { serverSupabaseClient } from '#supabase/server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    try {
        console.log('we reached here')
        const body: {email: string, password: string, type: 'signIn' | 'signUp'} = await readBody(event)
        const client = await serverSupabaseClient(event)
    
        if(!body.type) throw {errors: ['Não foi possivel definir o tipo da operação'], statusCode: 400}
        if(!body.email || !body.password ) throw {errors: ['Informações faltando'], statusCode: 400}
    
        if(body.type === 'signIn') {
            const {error} = await client.auth.signInWithPassword({
                email: body.email,
                password: body.password,
            })
            if(error) throw {errors: [error.message === 'Email not confirmed' && "email não confirmado" || error.status == 400 && 'Credenciais invalidas' || error.status == 404 && 'Usuário não encontrado' || 'Algo deu errado'], statusCode: error.status}
            return {status: 'success'}
        }
        if(body.type === 'signUp'){
            const {data, error } = await client.auth.signUp({
                email: body.email,
                password: body.password,
            })
    
            if(error) throw {errors: [error.status == 400 && 'Credenciais invalidas' || 'Algo deu errado'], statusCode: error.status}
    
            console.log(data.user.id, data)
            const user  = data.user?.id && prisma.user.create({
                data: {
                    id: data.user?.id
                }
            }).catch((err) => {
                console.log(err)
                client.auth.deleteUser(data.user.id, true)
                throw {errors: ['Não foi possivel deletar o usuario'], statusCode: 500}
            })
    
            return {status: 'success'}
        }
    } 
    catch (error: any) {
		throw {errors: error?.errors || ['erro  no servidor ao tentar realizar a açao'], statusCode: error.statusCode || 500}
	}
})