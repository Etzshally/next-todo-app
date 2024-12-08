"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddTodoForm = ({ userId }: { userId: string }) => {
  const router = useRouter()
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage(null); // Clear previous error message

    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, name }),
    });

    const result = await response.json();
    setLoading(false);

    if (response.ok) {
      setName(""); // Clear the form after successful submission
      alert("Task added successfully!");
      router.refresh()
    } else {
      setErrorMessage(result.message || "Error adding task");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
      >
        {isOpen ? "Close Add Task Form" : "Open Add Task Form"}
      </button>

      {isOpen && (
        <form
          onSubmit={handleAddTask}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <h2 className="text-xl font-semibold text-center">Add Task</h2>
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Task name"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Task"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTodoForm;
