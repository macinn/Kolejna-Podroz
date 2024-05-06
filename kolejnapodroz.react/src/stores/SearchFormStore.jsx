import { create } from 'zustand';

export const useStore = create((set) => ({
    
    StartStationId: "",
    setStartStation: (newValue) => set({ StartStationId: newValue }),

    EndStationId: "",
    setEndStation: (newValue) => set({ EndStationId: newValue }),

    DepartureTime: "",
    setDepartureTime: (newValue) => set({ DepartureTime: newValue }),

    connections: null,
    setConnections: (newValue) => set({ connections: newValue }),

    selectedConnection: "",
    setSelectedConnection: (newValue) => set({ selectedConnection: newValue }),

}));
