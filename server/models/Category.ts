import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const selectOptions = {
    name: true,
    description: true,
    image: true,
    product: true,
    is_active: true
}
//userId === cartId in the db
export interface CategoryBodyInterface{
    name: string,
    description?: string,
    img?: string,
    userId?: string
    
}

export interface CategoryQueryInterface{
    name: string,
}

class Category{
	public body: CategoryBodyInterface | null | undefined
	public query: CategoryQueryInterface | null | undefined
	public errors: String[]
	public response: any
	public prisma: typeof prisma
  
	constructor(body?: CategoryBodyInterface, query?: CategoryQueryInterface){
		this.body = body
		this.query = query
		this.errors = [] 
		this.response = null
		this.prisma = prisma
	}

	async getAllCategories(){
		console.log('a')
		const items = await this.prisma.category.findMany({}).catch(err => this.errors.push("nao foi possivel encontrar as categorias") && console.log(err))
		if(this.errors.length > 0) return
		this.response = items
	}  


	async getCategory(){
		if(!this.query?.name) return this.errors.push("informações faltando")

		const product = await this.prisma.category.findUnique({
			where: {
				name: this.query.name
			},
            select: selectOptions
		}).catch(err => this.errors.push("nao foi possivel encontrar a categoria"))

		if(this.errors.length > 0) return
    
		this.response = product
	}

	async newCategory(){
        if(!this.body?.name )return this.errors.push("informações faltando")
		const newCategory = await this.prisma.category.create({
			data: {
                name: this.body.name,
                description: this.body?.description,
                image: this.body?.img
			},
            select: selectOptions
		}).catch((error) => this.errors.push('erro ao criar a categoria'))


		if(this.errors.length > 0) return

		this.response = newCategory
	}

    async deleteCategory(){
		if(!this.query?.name) return this.errors.push("informações faltando.")

		const product = await this.prisma.category.delete({
			where: {
				name: this.query.name
			},
            select: selectOptions
		}).catch(err => this.errors.push("nao foi possivel deletar a categoria"))

		if(this.errors.length > 0) return
    
		this.response = product
	}
}

export default Category