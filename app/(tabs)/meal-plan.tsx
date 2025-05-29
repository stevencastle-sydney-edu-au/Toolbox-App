// In the createMealPlan mutation
const [createMealPlan] = useMutation(CREATE_MEAL_PLAN, {
  refetchQueries: [{ query: GET_MEAL_PLANS }],
  awaitRefetchQueries: true,
});