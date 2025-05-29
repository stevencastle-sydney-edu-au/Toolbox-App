// In the addGoal mutation
const [addGoal] = useMutation(ADD_GOAL, {
  refetchQueries: [{ query: GET_GOALS }],
  awaitRefetchQueries: true,
});