import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

// Create a new task (Todo)
export async function POST(req: Request) {
    try {
        const { name, userId } = await req.json();

        if (!name || !userId) {
            return NextResponse.json(
                { message: "Name and userId are required." },
                { status: 400 }
            );
        }

        // Create the task in the database
        const newTask = await db.task.create({
            data: {
                name,
                userId: parseInt(userId),
            },
        });

        return NextResponse.json(
            { task: newTask, message: "Task created successfully." },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal Server Error." },
            { status: 500 }
        );
    }
}

// Get all tasks for a specific user
export async function GET(req: Request) {
    try {
        const { userId } = await req.json();

        if (!userId) {
            return NextResponse.json(
                { message: "UserId is required." },
                { status: 400 }
            );
        }

        // Get all tasks for the given userId
        const tasks = await db.task.findMany({
            where: {
                userId: parseInt(userId),
            },
        });

        return NextResponse.json({ tasks }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal Server Error." },
            { status: 500 }
        );
    }
}

// Delete a specific task (Todo) by id
// DELETE handler
export async function DELETE(req: Request) {
    try {
        const { id } = await req.json(); // Expect id in the request body

        if (!id) {
            return NextResponse.json(
                { message: "ID is required." },
                { status: 400 }
            );
        }

        const deletedTask = await db.task.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json(
            { task: deletedTask, message: "Task deleted successfully." },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal Server Error." },
            { status: 500 }
        );
    }
}


// Update a specific task (Todo) by id
// PUT handler
export async function PUT(req: Request) {
    try {
        const { id, completed } = await req.json(); // Expect completed status in the request body

        if (!id || completed === undefined) {
            return NextResponse.json(
                { message: "ID and completed status are required." },
                { status: 400 }
            );
        }

        const updatedTask = await db.task.update({
            where: { id: parseInt(id) },
            data: { completed }, // Update the completed field
        });

        return NextResponse.json(
            { task: updatedTask, message: "Task updated successfully." },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal Server Error." },
            { status: 500 }
        );
    }
}
