export interface filterInterface{
    sortBy: null,
    typesSelected: null,
    numberOfSessions: null,
    searchQuery: null 
}
export const useFilterState = () => useState<filterInterface>('filter', () => {
    return {
        sortBy: '',
        typesSelected: [],
        numberOfSessionsSelected: [],
        searchQuery: '',
        priceRange: null
    }
})