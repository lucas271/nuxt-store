
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context?.userId
    console.log(userId)
    if(!userId) throw {errors: ['Informações faltando'], statusCode: 400}
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    }).catch((error) => {
      console.log(error)
      throw {errors: ['Não foi possivel encontrar o usuário'], statusCode: 400}
    })

    console.log(user)
    return {user: user}
  } catch (error: any) {
    console.log(error, 'okfidsjufhjaujfiad')
    throw createError({
      statusCode: error?.statusCode || 500,
      message: JSON.stringify({errors: error?.errors || ["erro no servidor"]}),
    })
  }
})