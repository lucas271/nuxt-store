interface productInterface {
    id: string,
    createdAt?: string,
    updatedAt?:string,
    name: string,
    description: string,
    title: string
    price: number,
    img?: string,
    quantity: number
    is_available: boolean,
    category?: string,
}

export default productInterface