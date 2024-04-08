export interface filterInterface{
    sortBy: null,
    typesSelected: null,
    numberOfSessions: null,
    searchQuery: null 
}
export const useFilterState = () => useState<filterInterface>('filter', () => {
    return {
        sortBy: {
            isPriceAscending: null,
            isMostFavorites: null,
            isNewest: null,
        },
        categoriesSelected: [],
        numberOfSessionsSelected: [],
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