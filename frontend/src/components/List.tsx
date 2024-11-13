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
                {list?.map((element) => {
                    return (
                        <li key={element.id}>
                            {Object.keys(element).map((key) => {
                                const value = (element as any)[key as keyof typeof element];
                                return (
                                    <p key={key}>
                                        {value}
                                    </p>
                                );
                            })}
                            <button onClick={() => deleteMutation.mutate(element.id)}>Delete</button>
                            <button onClick={() => setId(element.id)}>Update</button>
                            {id === element.id && (
                                <UpdateForm element={element} updateMutation={updateMutation} setId={setId} />
                            )}
                        </li>
                    );
                })}
            </ul>
        </>

    )
}




export default List;