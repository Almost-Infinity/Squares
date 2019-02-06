import { createContext } from 'react';

export const AuthModalContext = createContext({
	isAuthModalShown: false,
	toggleAuthModal: () => {}
});