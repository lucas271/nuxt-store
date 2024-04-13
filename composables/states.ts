export interface filterInterface{
    sortBy: null,
    typesSelected: null,
    numberOfSessions: null,
    searchQuery: null 
    sessions: ['1 sessão', '5 sessões', '10 sessões']
}
export const useFilterState = () => useState<filterInterface>('filter', () => {
    return {
        sortBy: {
            isPriceAscending: null,
            isMostFavorites: null,
            isNewest: null,
        },
        categoriesSelected: [],
        sessions: [],
        startsWith: '',
        priceRange: null
    }
})

export const usePagination = () => useState<filterInterface>('pagination', () => {
    return {
        take: 12,
        skip: 0,
    }
})