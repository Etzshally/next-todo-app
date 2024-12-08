// pages/dashboard.tsx
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/prisma';
import AddTodoForm from '@/components/ui/AddTodoForm';
import TodoList from '@/components/ui/TodoList';

type Todo = {
  id: number;
  name: string;
  description: string | null;
  completed: boolean;
};

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session?.user);

  if (!session?.user) {
    return <div>Please login</div>;
  }

  // Fetch todos for the logged-in user
  const todos: Todo[] = await db.task.findMany({
    where: { userId: parseInt(session.user.id) },
  });

  return (
    <div>
      <h1>Dashboard page - welcome back {session?.user.name}</h1>
      {/* AddTodoForm to add a new task */}
      <AddTodoForm userId={session?.user?.id} />

      {/* TodoList to display and manage tasks */}
      <TodoList todos={todos} userId={session.user.id} />
    </div>
  );
};

export default DashboardPage;
