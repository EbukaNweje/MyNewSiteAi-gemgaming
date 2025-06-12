import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage for web
import { combineReducers } from 'redux';
import UserData from './UserData'; // Make sure this is your slice (userData.reducer)

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Only persist 'user' slice (optional but safer)
};

const rootReducer = combineReducers({
  user: UserData,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
