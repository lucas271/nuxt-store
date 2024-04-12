import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
//userId === cartId in the db
export interface ReviewBodyInterface{
    userId: string,
    username?: string
    commentId?: string,
    message?: string,
    productId?: string,
    rate?: string
}

export interface ReviewQueryInterface{    
    productId: string
}

const selectReview = {
    message: true,
    userId: true,
    product_id: true,
    id: true,
    username: true,
    Rating: true,
    updated_at: true,
    created_at: true,
}

class Review{
    public body: ReviewBodyInterface | null | undefined
    public query: ReviewQueryInterface | null | undefined
    public errors: String[]
    public response: any
    public prisma: typeof prisma

    constructor(body?: ReviewBodyInterface, query?: ReviewQueryInterface){

        this.body = body
        this.query = query
        this.errors = []
        this.response = null
        this.prisma = prisma
    }

    async getReviews(){
        if(!this.query?.productId) return this.errors.push('Não recebeu o produto para obter as avaliações')
        const products = await this.prisma.review.findMany({
            where: {
                product_id: this.query?.productId
            },
            select: {
                ...selectReview,
            }
        }).catch(err => this.errors.push("Não foi possível obter as avaliações"))

        if(this.errors.length > 0) return
        this.response = products
    }  

    async createNewReview(){
        if(!this.body?.userId) return this.errors.push('Necessário estar logado para criar uma avaliação')
        if(!this.body?.productId) return this.errors.push('Não recebeu o ID do produto avaliado')
        if(!this.body?.message) return this.errors.push("Não recebeu a mensagem")
        if(!this.body?.username) return this.errors.push("Não recebeu o nome de usuário")
        console.log(Number(this.body.rate))
        const newReview = Number(this.body?.rate) ? await this.prisma.review.create({
            data: {
                userId: this.body.userId,
                username: this.body.username,
                product_id: this.body.productId,
                message: this.body.message,
                Rating: {
                    create: {
                        rate: Number(this.body.rate),
                        user_id: this.body.userId,
                        product_id: this.body.productId
                    }
                }
            },
            select: {
                ...selectReview,
            }
        }).catch((error) => this.errors.push('Erro ao criar a avaliação') && console.log(error)) : await this.prisma.review.create({
            data: {
                userId: this.body.userId,
                username: this.body.username,
                product_id: this.body.productId,
                message: this.body.message,
            },
            select: {
                ...selectReview,
            }
        }).catch((error) => this.errors.push('Erro ao criar a avaliação') && console.log(error))
        
        if(this.errors.length > 0) return
        this.response = newReview
    }

    async deleteReview(){
        if(!this.body?.userId) return this.errors.push("Você precisa estar logado para excluir sua avaliação")
        if(!this.body?.commentId) return this.errors.push("Não recebeu o ID da mensagem")

        const deletedReview = await this.prisma.review.delete({
            where:{
                id: this.body.commentId,
                userId: this.body.userId,
            },
            select: {
                ...selectReview,
            }
        }).catch((err) => this.errors.push('Erro ao excluir a avaliação') && console.log(err))
        if(this.errors.length > 0) return

        this.response = deletedReview
    }

    async updateMessage(){
        console.log(this.body, 'pokdpaskdpakspdkapda')
        if(!this.body?.userId) return this.errors.push("Você precisa estar logado para atualizar sua avaliação")
        if(!this.body?.commentId) return this.errors.push("Não recebeu o ID da mensagem")
        if(!this.body?.message) return this.errors.push("Nenhuma mensagem recebida")

        const updatedReview = Number(this.body.rate) ? await this.prisma.review.update({
            where: {
                id: this.body.commentId,
                userId: this.body.userId
            },
            data:{
                message: this.body.message,
                Rating: {
                    update: {
                        rate: Number(this.body.rate)
                    }
                }
            },
            select: {
                ...selectReview,
            }
        }).catch((err) => this.errors.push('Erro ao atualizar a mensagem')) : await this.prisma.review.update({
            where: {
                id: this.body.commentId,
                userId: this.body.userId
            },
            data:{
                message: this.body.message,
            },
            select: {
                ...selectReview,
            }
        }).catch((err) => {
            console.log(err)
            this.errors.push('Erro ao atualizar a mensagem')
        })

        if(this.errors.length > 0) return

        this.response = updatedReview
    }
}

export default Review