import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

interface Post {
    id?: number;
    title: string;
    content: string;
  }

const Userspage: React.FC = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");

  const { status, data, error } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/posts");
      return await response.json();
    },
  });

  const addMutation = useMutation({
    mutationFn: ({ title, content }: Post) =>
      fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  if (status === "pending") return <h1>Loading...</h1>;
  if (status === "error") return <span>Error: {error.message}</span>;

  return (
    <>
      <ul>
        {data?.map((e) => {
          return (
            <li>
              <p>{e.title}</p>
              <p>{e.content}</p>
            </li>
          );
        })}
      </ul>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          addMutation.mutate({ title, content });
        }}
      >
        <input
          placeholder="title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          placeholder="content"
          value={content}
          onChange={(ev) => setContent(ev.target.value)}
        />
        <button>Subbmit</button>
      </form>
    </>
  );
};

export default Userspage;
