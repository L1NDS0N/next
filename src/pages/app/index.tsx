import { prisma } from '../../lib/prisma';
import { GetServerSideProps } from 'next';
import { signOut } from 'next-auth/react';
import { Task } from '@prisma/client';
import { useState } from 'react';

type TasksProps = {
  tasks: Task[];
  // tasks: Pick<Task>;
};

export default function App({ tasks }: TasksProps) {
  const [newTask, setNewTask] = useState('');

  async function handleCreateTask(e: React.FormEvent) {
    e.preventDefault();

    await fetch('http://localhost:3000/api/tasks/create', {
      method: 'POST',
      body: JSON.stringify({ title: newTask }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return (
    <div>
      <h1>Bem vindo!</h1>

      <ul>
        <li>
          {tasks.map(task => (
            <li className="text-6xl" key={task.id}>
              {task.title}
            </li>
          ))}
        </li>
      </ul>
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
      <button onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
        Sair
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tasks = await prisma.task.findMany();

  const data = tasks.map(task => {
    return {
      id: task.id,
      title: task.title,
      done: task.done,
      // date: task.createdAt.toISOString(),
    };
  });

  return {
    props: {
      tasks: data,
    },
  };
};
