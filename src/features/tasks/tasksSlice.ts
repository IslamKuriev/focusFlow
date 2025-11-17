import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Task {
    id: string;
    text: string;
    completed: boolean;
    finishedAt?: string;
}

interface TasksState {
    list: Task[];
    history: Task[];
    currentTaskId: string | null;
}

const initialState: TasksState = {
    list: [],
    history: JSON.parse(localStorage.getItem("taskHistory") || "[]"),
    currentTaskId: null,
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<string>) {
            const newTask = {
                id: crypto.randomUUID(),
                text: action.payload,
                completed: false,
            };
            state.list.push(newTask);

            if (!state.currentTaskId) {
                state.currentTaskId = newTask.id;
            }
        },

        toggleTask(state, action: PayloadAction<string>) {
            const task = state.list.find((t) => t.id === action.payload);
            if (!task) return;

            task.completed = !task.completed;

            if (task.completed) {
                state.history.push({
                    ...task,
                    finishedAt: Date.now(),
                });
                saveHistory(state.history);
            }

            const next = state.list.find(t => !t.completed);
            state.currentTaskId = next ? next.id : null;
        },


        deleteTask(state, action: PayloadAction<string>) {
            state.list = state.list.filter(t => t.id !== action.payload);
        },

        setCurrentTask(state) {
            const next = state.list.find(t => !t.completed);
            state.currentTaskId = next ? next.id : null;
        },

        clearHistory(state) {
            state.history = [];
            saveHistory([]);

        }
    },
});

export const { addTask, toggleTask, deleteTask, setCurrentTask, clearHistory } = tasksSlice.actions;
export default tasksSlice.reducer;

const saveHistory = (history: Task[]) => {
    localStorage.setItem("taskHistory", JSON.stringify(history));
};