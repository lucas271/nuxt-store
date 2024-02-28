export interface filterInterface{
    sortBy: null,
    typesSelected: null,
    numberOfSessions: null,
    searchQuery: null 
}
export const useFilterState = () => useState<filterInterface | null>('filter', () => {
    return {
        sortBy: '',
        typesSelected: [],
        numberOfSessionsSelected: [],
        searchQuery: '',
        priceRange: null
    }
})