// In the addThoughtLog mutation
const [addThoughtLog] = useMutation(ADD_THOUGHT_LOG, {
  refetchQueries: [{ query: GET_THOUGHT_LOGS }],
  awaitRefetchQueries: true,
});