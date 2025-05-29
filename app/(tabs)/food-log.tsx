// In the addFoodEntry mutation
const [addFoodEntry] = useMutation(ADD_FOOD_ENTRY, {
  refetchQueries: [
    { 
      query: GET_FOOD_ENTRIES,
      variables: { date: new Date().toISOString().split('T')[0] }
    },
    { 
      query: GET_RECENT_ACTIVITIES,
      variables: { date: new Date().toISOString().split('T')[0] }
    }
  ],
  awaitRefetchQueries: true,
});