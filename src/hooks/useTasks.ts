import { useEffect, useState } from 'react';
import { TaskType } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { addDoc, deleteDoc, getDocs, query, updateDoc } from 'firebase/firestore';
import { collection, orderBy, doc } from 'firebase/firestore';
import { firestore } from "../firebase"

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
        // debugger
        const fetchTasks = async () => {
            const taskQuery = query(collection(firestore, "tasks"), orderBy("addedDate", "desc"));
            const querySnapshot = await getDocs(taskQuery);

            const fetchedTasks = querySnapshot.docs.map((doc): TaskType => {
                const data = doc.data();
                return {
                    taskId: doc.id,
                    title: data.title,
                    description: data.description,
                    addedDate: data.addedDate ? data.addedDate.toDate() : new Date(),
                    color: data.color,
                } as TaskType;
            }) as TaskType[];

            setTasks(fetchedTasks);
        };

        fetchTasks();
    }, []);


    //uzywamy typu Omit, czyli dla naszego obiektu nie podajemy id, jest ono generowane przez firebase, dopiero potem sobie je pobieramy i przypisujemy do kolecji
    const addTask = async (newTask: Omit<TaskType, "taskId">) => {
        try {
            const docRef = await addDoc(collection(firestore, "tasks"), {
                title: newTask.title,
                description: newTask.description,
                addedDate: newTask.addedDate || new Date(),
                color: newTask.color,
            });

            const newTaskWithId: TaskType = { ...newTask, taskId: docRef.id };
            const updatedTasks = [newTaskWithId, ...tasks];
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const updateTask = async (updatedTask: TaskType) => {
        const taskDocRef = doc(firestore, "tasks", updatedTask.taskId);

        await updateDoc(taskDocRef, {
            title: updatedTask.title,
            description: updatedTask.description,
            addedDate: updatedTask.addedDate,
            color: updatedTask.color,
        });

        setTasks(tasks.map(task => task.taskId === updatedTask.taskId ? updatedTask : task));
    };

    const deleteTask = async (taskId: string) => {
        const taskDocRef = doc(firestore, "tasks", taskId);
        await deleteDoc(taskDocRef);
        setTasks((task) => task.filter((t) => t.taskId !== taskId));
    };

    const generateRandomTasks = async () => {
        const newTasks: TaskType[] = [];

        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * cookingTasks.length);
            const randomColor = proposedColors[Math.floor(Math.random() * proposedColors.length)];
            const { title, description } = cookingTasks[randomIndex];


            const newTask: Omit<TaskType, "taskId"> = {
                title,
                description,
                addedDate: new Date(),
                color: randomColor,
            };

            const docRef = await addDoc(collection(firestore, "tasks"), {
                ...newTask,
            });
            const newTaskWithId: TaskType = { ...newTask, taskId: docRef.id };
            newTasks.push(newTaskWithId);
        }
        setTasks([...newTasks, ...tasks])
    };
    return { tasks, addTask, updateTask, deleteTask, generateRandomTasks };
};
export default useTasks