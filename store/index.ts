export const state = () => ({
  userId: null,
});

export const mutations = {
  setUserId(state: any, userId: string) {
    state.userId = userId;
  },
};
