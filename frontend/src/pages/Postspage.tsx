import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import List from "../components/List";
import { User, Post } from "../../../backend/src";

const PostsPage: React.FC = () => {


    const queryClient = useQueryClient();
    const [newTitle, setNewTitle] = useState<string>("");
    const [newContent, setNewContent] = useState<string>("");


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
        mutationFn: ({ updatedElement, id }: { updatedElement: Partial<Post>; id: number }) =>
            fetch(`http://localhost:3000/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedElement),
            }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] })
    });

    if (status === "pending") return <h1>Loading...</h1>;
    if (status === "error") return <span>Error: {error.message}</span>;



    return (
        <>
            {data && <List list={data as (User | Post)[]} deleteMutation={deleteMutation} updateMutation={updateMutation} />}
        </>
    );
};

export default PostsPage;
