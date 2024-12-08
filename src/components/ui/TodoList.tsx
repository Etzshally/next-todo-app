// components/TodoList.tsx

"use client"
import { useRouter } from 'next/navigation';
import { FiTrash2, FiCheckCircle, FiCircle } from 'react-icons/fi';

type Todo = {
    id: number;
    name: string;
    description: string | null;
    completed: boolean;
};

const TodoList = ({
    todos,
    userId,
}: {
    todos: Todo[];
    userId: string;
}) => {
    const router = useRouter()
    const handleDelete = async (id: number) => {
        console.log(id)
        const response = await fetch(`/api/todos/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        const result = await response.json();
        if (response.ok) {
            alert('Todo deleted successfully!');
            router.refresh()
        } else {
            alert(result.message || 'Error deleting todo');
        }
    };


    const handleUpdate = async (id: number, completed: boolean) => {
        const response = await fetch(`/api/todos/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, completed: !completed }),
        });
        const result = await response.json();
        if (response.ok) {
            alert('Todo updated successfully!');
            router.refresh()
        } else {
            alert(result.message || 'Error updating todo');
        }
    };


    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Your Todos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {todos.map((todo) => (
                    <div
                        key={todo.id}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                        <h3 className="text-xl font-medium">{todo.name}</h3>
                        <p className="text-gray-500 mt-2">{todo.description}</p>
                        <p className="text-gray-700 mt-2">
                            Completed: {todo.completed ? 'Yes' : 'No'}
                        </p>

                        <div className="flex justify-end space-x-4 mt-4">
                            {/* Update icon */}
                            <button
                                onClick={() => handleUpdate(todo.id, todo.completed)}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                {todo.completed ? (
                                    <FiCheckCircle className="w-6 h-6" />
                                ) : (
                                    <FiCircle className="w-6 h-6" />
                                )}
                            </button>

                            {/* Delete icon */}
                            <button
                                onClick={() => handleDelete(todo.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <FiTrash2 className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoList;
