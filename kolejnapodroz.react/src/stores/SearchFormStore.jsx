import { create } from 'zustand';

export const useStore = create((set) => ({
    
    startStation: "",
    setStartStation: (newValue) => set({ startStation: newValue }),

    endStation: "",
    setEndStation: (newValue) => set({ endStation: newValue }),

    departureTime: null,
    setDepartureTime: (newValue) => set({ departureTime: newValue }),

    connections: null,
    setConnections: (newValue) => set({ connections: newValue }),

    selectedConnection: "",
    setSelectedConnection: (newValue) => set({ selectedConnection: newValue }),

}));
