import { serverSupabaseClient } from '#supabase/server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    try {
        const body: {email: string, password: string, username?: string, type: 'signIn' | 'signUp'} = await readBody(event)
        console.log(body)

        const client = await serverSupabaseClient(event)
        if(!body.type) throw {errors: ['Não foi possivel definir o tipo da operação'], statusCode: 400}
        if(!body.email || !body.password ) throw {errors: ['Informações faltando'], statusCode: 400}
    
        if(body.type === 'signIn') {
            const {error, data} = await client.auth.signInWithPassword({
                email: body.email,
                password: body.password,
            })
            console.log(error, data)
            if(error) throw {errors: [error.message === 'Email not confirmed' && "email não confirmado" || error.status == 400 && 'Credenciais invalidas' || error.status == 404 && 'Usuário não encontrado' || 'Algo deu errado'], statusCode: error.status}
            return {user: {userId: data.user.id}}
        }
        else if(body.type === 'signUp'){
            console.log(body)
            if(!body.username) throw {errors: ['nome do usuário não recebido'], statusCode: 400}
            const {data, error } = await client.auth.signUp({
                email: body.email,
                password: body.password,
            })
            console.log(error)
            if(error) throw {errors: [error.status == 400 && 'Credenciais invalidas' || 'Algo deu errado'], statusCode: error.status}
    
            const user  = data.user?.id && await prisma.user.create({
                data: {
                    id: data.user?.id,
                    username: body.username
                }
            }).catch((err) => {
                console.log(err)
                data.user?.id && client.auth.admin.deleteUser(data.user.id)
                throw {errors: ['Não foi possivel deletar o usuario'], statusCode: 500}
            })
            console.log(user)
            return {user: {...user}}
        }
        else{
            throw {errors: ['Não foi recebido o tipo da operação'], statusCode: 400}
        }
    } 
    catch (error: any) {
        throw createError({
            statusCode: error?.statusCode || 500,
            message: JSON.stringify({errors: error?.errors || ["erro no servidor"]}),
        })
	}
})