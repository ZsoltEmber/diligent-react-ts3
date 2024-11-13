import { UseMutationResult } from "@tanstack/react-query";
import { Post, User } from "../../../backend/src";
import { FormEvent, MouseEvent, useState } from "react";

interface UpdateFormProps {
    element: User | Post
    updateMutation: UseMutationResult<Response, Error, {
        updatedElement: Partial<Post> | Partial<User>;
        id: number;
    }, unknown>
    setId: Function;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ updateMutation, element, setId }) => {
    const [updatedElement, setUpdatedElement] = useState<Partial<User> | Partial<Post>>(element)

    const handleChange = (key: string, value: string) => {
        setUpdatedElement((prev) => ({
            ...prev,
            [key]: value,
        }));
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.preventDefault();
        updateMutation.mutate({ updatedElement: updatedElement, id: element.id });
        setId(null)
    }

    return (
        <>
            {Object.keys(element as User | Post).map((key) => {
                const value = (element as any)[key];
                if(key != "id"){
                return (
                    <form key={key}
                        onSubmit={(event) => handleSubmit(event)}>
                        <label>{key}</label>
                        <input
                            type="text"
                            placeholder={value?.toString() || ""}
                            value={(updatedElement as any)[key] || ""}
                            onChange={(e) => handleChange(key, e.target.value)}
                        />
                    </form>
                );}
            })}
            <button onClick={(event) => handleSubmit(event)} type="submit">Submit</button>
        </>
    );
}

export default UpdateForm;
