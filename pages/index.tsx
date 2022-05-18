import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { getUsers } from '../src/lib/users';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <>
      <h1>{JSON.stringify(users)}</h1>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const users = await getUsers();

  console.log(users);
  
  return {
    props: {
      users,
    },
    revalidate: 5,
  };
};
