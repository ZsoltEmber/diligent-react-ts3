import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import List from "../components/List";
import { Post, User } from "../../../backend/src";

const Userspage: React.FC = () => {
  const queryClient = useQueryClient();
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

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
      fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",

      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ updatedElement, id }: { updatedElement: Partial<User>; id: number }) =>
      fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedElement),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] })
  });



  if (status === "pending") return <h1>Loading...</h1>;
  if (status === "error") return <span>Error: {error.message}</span>;
  console.log(data)
  return (
    <>
      {data && <List list={data as (User | Post)[]} deleteMutation={deleteMutation} updateMutation={updateMutation} />}
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
        <button>Subbmit</button>
      </form>
    </>
  );
};

export default Userspage;
