import { configureStore } from './store/configureStore';
import { watcher } from './store/watcher';

export const store = configureStore();
store.subscribe(() => watcher(store));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch