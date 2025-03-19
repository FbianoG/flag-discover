import { create } from 'zustand';

type State = {
	correct: number;
	incorrect: number;
	setCorrect: () => void;
	setIncorrect: () => void;
	setClear: () => void;
};

const usePointsStore = create<State>((set) => ({
	correct: 0,
	incorrect: 0,
	setCorrect: () => set((state) => ({ correct: state.correct + 1 })),
	setIncorrect: () => set((state) => ({ incorrect: state.incorrect + 1 })),
	setClear: () => set({ correct: 0, incorrect: 0 }),
}));

export default usePointsStore;
