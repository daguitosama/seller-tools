import clsx from "clsx";
import { useRef, useState } from "react";
import { useCopy } from "~/hooks/useCopy";

interface Title_ComposerProps {
    /**
     * Property description
     */
    // p: string;
}

/**
 * Component
 */
export const Title_Composer = ({ ...props }: Title_ComposerProps) => {
    const [title, set_title] = useState<string>("");
    const is_description_field_touch = useRef<boolean>(false);
    //
    const size = new Blob([title]).size;
    const MAX_SIZE = 200;
    const is_title_under_size_limit = size <= MAX_SIZE;
    const would_title_be_chunked_on_mobile = size > 80;
    //
    const { copy, copy_state } = useCopy();
    function on_copy_click() {
        copy(title);
    }
    return (
        <div className='grid gap-8'>
            <div className='grid gap-4'>
                <label
                    htmlFor='keywords'
                    className='text-gray-700'
                >
                    <span>Compose your title here: </span>
                    <span
                        className={clsx(
                            is_title_under_size_limit ? "text-green-600" : "text-red-600"
                        )}
                    >
                        Size: {size}, max {MAX_SIZE}
                    </span>
                </label>
                <textarea
                    className='w-full border border-gray-700 rounded-md shadow-md shadow-gray-300 p-4 '
                    id='description'
                    rows={10}
                    onChange={(evt) => {
                        if (!is_description_field_touch.current) {
                            is_description_field_touch.current = true;
                        }
                        set_title(evt.target.value);
                    }}
                ></textarea>
                {would_title_be_chunked_on_mobile ? (
                    <p className='text-amber-500'>
                        A title Longer then 80 characters, like this one, would be chunked on mobile
                        view
                    </p>
                ) : null}
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
};
