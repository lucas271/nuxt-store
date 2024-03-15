export default async function(classInstance: {errors: [], response: any} | any, callback: () => Promise<any>, responseSuccessName: string): Promise<{ [x: string]: any; }>{
	try {
		await callback()
		if(classInstance.errors.length > 0) throw {errors: classInstance.errors, statusCode: 400}
		return {[responseSuccessName]: classInstance.response}
	} catch (error: any) {
		throw {errors: error?.errors || ['erro  no servidor ao tentar realizar a açao'], statusCode: error.statusCode}
	}

} 