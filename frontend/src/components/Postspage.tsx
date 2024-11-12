import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

interface Post {
    id: number;
    title: string;
    content: string;
}

const Postspage: React.FC = () => {


    const queryClient = useQueryClient();
    const [id, setId] = useState<number | null>(null);
    const [newTitle, setNewTitle] = React.useState<string>("");
    const [newContent, setNewContent] = React.useState<string>("");
    const [updatedTitle, setUpdatedTitle] = React.useState<string>("");
    const [updatedContent, setUpdatedContent] = React.useState<string>("");

    const { status, data, error } = useQuery<Post[]>({
        queryKey: ["posts"],
        queryFn: async () => {
            const response = await fetch("http://localhost:3000/posts");
            return await response.json();
        },
    });

    const addMutation = useMutation({
        mutationFn: (newPost: Partial<Post>) =>
            fetch("http://localhost:3000/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPost),
            }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) =>
            fetch(`http://localhost:3000/posts/${id}`, {
                method: "DELETE",

            }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
    });

    const updateMutation = useMutation({
        mutationFn: ({ updatedPost, id }: { updatedPost: Partial<Post>; id: number }) =>
            fetch(`http://localhost:3000/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedPost),
            }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] })
    });

    if (status === "pending") return <h1>Loading...</h1>;
    if (status === "error") return <span>Error: {error.message}</span>;



    return (
        <>
          <form
                onSubmit={(event) => {
                    event.preventDefault();
                    addMutation.mutate({ title: newTitle, content: newContent });
                }}
            >
                <input
                    placeholder="title"
                    value={newTitle}
                    onChange={(ev) => setNewTitle(ev.target.value)}
                />
                <input
                    placeholder="content"
                    value={newContent}
                    onChange={(ev) => setNewContent(ev.target.value)}
                />
                <button>Submit</button>
            </form>
            <ul>
                {data?.map((e) => {
                    return (
                        <li key={e.id}>
                            <p>{e.title}</p>
                            <p>{e.content}</p>
                            <button onClick={() => deleteMutation.mutate(e.id)}>delete</button>
                            <button onClick={() => { setId(e.id) }}>update</button>
                            {id === e.id ? <>
                                <input
                                    placeholder={e.title}
                                    value={updatedTitle}
                                    onChange={(ev) => setUpdatedTitle(ev.target.value)}
                                />
                                <input
                                    placeholder={e.content}
                                    value={updatedContent}
                                    onChange={(ev) => setUpdatedContent(ev.target.value)}
                                />
                                <button onClick={() => {
                                    updateMutation.mutate({ updatedPost: { content: updatedContent, title: updatedTitle }, id: e.id });
                                    setId(null);
                                }}>Submit</button>
                            </> : null}
                        </li>
                    );
                })
                }
            </ul>
        </>
    );
};

export default Postspage;
