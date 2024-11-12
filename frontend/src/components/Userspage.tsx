import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UsersPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [updatedName, setUpdatedName] = useState<string>("");
  const [updatedEmail, setUpdatedEmail] = useState<string>("");

  const { status, data, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/users");
      return await response.json();
    },
  });

  const addMutation = useMutation({
    mutationFn: ({ name, email }: Partial<User>) =>
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      fetch(`http://localhost:3000/users/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] })
  })

  if (status === "pending") return <h1>Loading...</h1>;
  if (status === "error") return <span>Error: {error.message}</span>;

  return (
    <>
      <ul>
        {data?.map((e) => {
          return (
            <li key={e.id}>
              <p>{e.name}</p>
              <p>{e.email}</p>
              <button onClick={()=> deleteMutation.mutate(e.id)}>delete</button>
            </li>
          );
        })}
      </ul>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          addMutation.mutate({ name, email });
        }}
      >
        <input
          placeholder="name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <input
          placeholder="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <button>Submit</button>
      </form>
    </>
  );
};

export default UsersPage;
