import { UseMutationResult } from "@tanstack/react-query";
import { User, Post } from "../../../backend/src/index"
import { useState } from "react";
import UpdateForm from "./updateForm";


interface ListProps<T> {
    list: T[]
    deleteMutation: UseMutationResult<Response, Error, number, unknown>
    updateMutation: UseMutationResult<Response, Error, {
        updatedElement: Partial<Post> | Partial<User>;
        id: number;
    }, unknown>
}


const List: React.FC<ListProps<User | Post>> = ({ list, deleteMutation, updateMutation }) => {
    const [id, setId] = useState<number | null>(null);

    return (
        <>
            <ul>
                {list?.map((e) => {
                    if ("name" in e) {
                        return (
                            <li key={e.id}>
                                <p>{e.name}</p>
                                <p>{e.email}</p>
                                <button onClick={() => deleteMutation.mutate(e.id)}>delete</button>
                                <button onClick={() => { setId(e.id) }}>update</button>
                                {id ? <UpdateForm element={e} updateMutation={updateMutation} setId={setId} /> : <></>}
                            </li>
                        );
                    }
                    if ("title" in e) {
                        return (
                            <li key={e.id}>
                                <p>{e.title}</p>
                                <p>{e.content}</p>
                                <button onClick={() => deleteMutation.mutate(e.id)}>delete</button>
                                <button onClick={() => { setId(e.id) }}>update</button>
                                {id ? <UpdateForm element={e} updateMutation={updateMutation} setId={setId} /> : <></>}
                            </li>
                        )
                    }
                })}
            </ul>
        </>
    )
}


export default List;