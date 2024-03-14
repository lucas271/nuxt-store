import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
//userId === cartId in the db
export interface RatingBodyInterface{
    userId: string,
    reviewId: string,
    ratingId?: string,
    ratingValue?: string,
    productId?: string
}

export interface RatingQueryInterface{    
    productId: string
}

class Rating{
	public body: RatingBodyInterface | null | undefined
	public query: RatingQueryInterface | null | undefined
	public errors: String[]
	public response: any
	public prisma: typeof prisma
  
	constructor(body?: RatingBodyInterface, query?: RatingQueryInterface){

		this.body = body
		this.query = query
		this.errors = []
		this.response = null
		this.prisma = prisma
	}

	async getRatings(){
		if(!this.query?.productId) return this.errors.push('Não recebeu o produto para obter as avaliações')
		const ratings = await this.prisma.rating.findMany({
			where: {
				product_id: this.query?.productId
			}
		}).catch(err => this.errors.push("Não foi possível obter as avaliações"))
		if(this.errors.length > 0) return
		this.response = ratings
	}  

	async createNewRating(){
		if(!this.body?.userId) return this.errors.push('É necessário estar logado para avaliar algo')
		if(!this.body?.productId) return this.errors.push('Não recebeu o ID da avaliação')
		if(!this.body?.reviewId) return this.errors.push('Não recebeu o ID da avaliação')

		if(Number(!this.body?.ratingValue)) return this.errors.push("Não recebeu uma avaliação válida")
		const newRating = await this.prisma.rating.create({
			data: {
				user_id: this.body?.userId,
				review_id: this.body?.reviewId,
				product_id: this.body.productId,
				rate: Number(this.body.ratingValue)
			}
		}).catch((error) => this.errors.push('Erro ao criar a avaliação'))

		if(this.errors.length > 0) return
		this.response = newRating
	}

	async deleteRating(){
		if(!this.body?.userId) return this.errors.push("Você precisa estar logado para excluir sua avaliação")
		if(!this.body?.ratingId) return this.errors.push("Não recebeu o ID da avaliação")

		const deletedRating = await this.prisma.rating.delete({
			where:{
				id: this.body.ratingId,
				user_id: this.body.userId
			}
		}).catch(() => this.errors.push('Erro ao excluir a avaliação'))

		if(this.errors.length > 0) return

		this.response = deletedRating
	}

	async updateRating(){
		if(!this.body?.userId) return this.errors.push("Você precisa estar logado para atualizar sua avaliação")
		if(!this.body?.ratingId) return this.errors.push("Não recebeu o ID da avaliação")
		if(!Number(this.body?.ratingValue)) return this.errors.push("Avaliação inválida recebida")

		const updatedRating = await this.prisma.rating.update({
			where: {
				id: this.body.ratingId,
				user_id: this.body.userId
			},
			data:{
				rate: Number(this.body.ratingValue)
			}
		}).catch(() => this.errors.push('Erro ao atualizar a avaliação'))

		if(this.errors.length > 0) return

		this.response = updatedRating
	}
}

export default Rating