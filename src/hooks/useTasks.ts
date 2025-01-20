import { useEffect, useState } from 'react';
import { TaskType } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';

const cookingTasks = [
    { title: "Prepare chicken", description: "Take chicken off the fridge, then wash it." },
    { title: "Cut vegetables", description: "Chop onions, carrots, and celery for soup." },
    { title: "Boil pasta", description: "Heat water, add salt, and cook pasta for 8 minutes." },
    { title: "Bake a cake", description: "Mix flour, eggs, and sugar. Bake for 40 minutes." },
    { title: "Make a salad", description: "Combine lettuce, tomatoes, cucumbers, and olive oil." },
    { title: "Grill steak", description: "Season the steak, heat the grill, and cook for 4 minutes on each side." },
    { title: "Make pancakes", description: "Mix flour, eggs, and milk. Cook on a hot pan." },
    { title: "Prepare soup", description: "Boil water, add vegetables, and simmer for 30 minutes." },
    { title: "Roast chicken", description: "Season chicken, place in the oven, and bake for 1 hour." },
    { title: "Cook rice", description: "Rinse rice, boil water, and cook until soft." },
    { title: "Fry eggs", description: "Heat oil in a pan and fry eggs to your liking." },
    { title: "Make a smoothie", description: "Blend bananas, strawberries, and milk until smooth." },
    { title: "Toast bread", description: "Place slices of bread in a toaster and wait until golden brown." },
    { title: "Bake cookies", description: "Mix dough, shape cookies, and bake in the oven." },
    { title: "Prepare fish", description: "Clean the fish, season it, and grill for 10 minutes." },
];


const useTasks = () => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const proposedColors = useSelector((state: RootState) => state.color.proposedColors);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        setTasks(storedTasks);
    }, []);

    const getNextTaskId = (tasks: TaskType[]): number => {
        const maxId = tasks.length > 0 ? Math.max(...tasks.map((task) => task.taskId)) : 0;
        return maxId + 1;
    };

    const addTask = (newTask: TaskType) => {
        const newTaskWithId: TaskType = { ...newTask, taskId: getNextTaskId(tasks) };
        const updatedTasks = [newTaskWithId, ...tasks];
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const updateTask = (updatedTask: TaskType) => {
        const updatedTasks = tasks.map(task =>
            task.taskId === updatedTask.taskId ? updatedTask : task
        );
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const deleteTask = (taskId: number) => {
        const updatedTasks = tasks.filter((task) => task.taskId !== taskId);
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const generateRandomTasks = () => {
        const currentTasks = [...tasks];
        let nextTaskId = getNextTaskId(currentTasks);

        const newTasks = Array.from({ length: 5 }, () => {
            const randomIndex = Math.floor(Math.random() * cookingTasks.length);
            const randomColor = proposedColors[Math.floor(Math.random() * proposedColors.length)];
            const { title, description } = cookingTasks[randomIndex];
            return {
                taskId: nextTaskId++,
                title,
                description,
                addedDate: new Date(),
                color: randomColor,
            } as TaskType;
        });

        const updatedTasks = [...currentTasks, ...newTasks];
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    return { tasks, addTask, updateTask, deleteTask, generateRandomTasks };
};
export default useTasks