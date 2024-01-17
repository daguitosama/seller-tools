import clsx from "clsx";
import { useRef, useState } from "react";
import { useCopy } from "~/hooks/useCopy";

export function DirectionsComposer() {
    const [description, set_description] = useState<string>("");
    const is_description_field_touch = useRef<boolean>(false);
    //
    const size = new Blob([description]).size;
    const MAX_DIRECTION_SIZE = 500;
    const is_description_under_size_limit = size <= MAX_DIRECTION_SIZE;
    //
    const { copy, copy_state } = useCopy();
    function on_copy_click() {
        copy(description);
    }

    return (
        <div className='grid gap-8'>
            <div className='grid gap-4'>
                <label
                    htmlFor='keywords'
                    className='text-gray-700'
                >
                    Compose your Directions here:
                </label>
                <textarea
                    className='w-full border border-gray-700 rounded-md shadow-md shadow-gray-300 p-4 '
                    id='description'
                    rows={10}
                    onChange={(evt) => {
                        if (!is_description_field_touch.current) {
                            is_description_field_touch.current = true;
                        }
                        set_description(evt.target.value);
                    }}
                ></textarea>
            </div>
            <div className='grid gap-4'>
                <p>
                    <span
                        className={clsx(
                            is_description_under_size_limit ? "text-green-600" : "text-red-600"
                        )}
                    >
                        Size: {size} max is {MAX_DIRECTION_SIZE}
                    </span>{" "}
                    <span>This is how it might look like at the offer page: </span>
                </p>
                <div
                    className='w-full border border-gray-700 rounded-md shadow-md shadow-gray-300 p-4'
                    dangerouslySetInnerHTML={{ __html: description }}
                ></div>
            </div>
            <button
                onClick={on_copy_click}
                className={clsx(
                    "bg-black text-white text-lg py-2 rounded-md shadow-sm ",
                    copy_state == "copied" ? "bg-green-600" : ""
                )}
            >
                <span>{copy_state == "copied" ? "Copied" : "Copy"}</span>
            </button>
        </div>
    );
}
