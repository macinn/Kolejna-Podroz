import { create } from 'zustand';

export const useStore = create((set) => ({
    
    StartStationId: "",
    setStartStation: (newValue) => set({ StartStationId: newValue ? newValue : ""}),

    EndStationId: "",
    setEndStation: (newValue) => set({ EndStationId: newValue ? newValue : "" }),

    DepartureTime: "",
    setDepartureTime: (newValue) => set({ DepartureTime: newValue ? newValue : "" }),

    connections: [],
    setConnections: (newValue) => set({ connections: newValue ? newValue : [] }),

    selectedConnection: "",
    setSelectedConnection: (newValue) => set({ selectedConnection: newValue ? newValue : "" }),

}));
