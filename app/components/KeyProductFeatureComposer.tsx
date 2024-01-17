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
export const KeyProductFeatureComposer = ({ ...props }: Title_ComposerProps) => {
    const [feature, set_feature] = useState<string>("");
    const is_description_field_touch = useRef<boolean>(false);
    //
    const size = new Blob([feature]).size;
    const MAX_SIZE = 250;
    const is_title_under_size_limit = size <= MAX_SIZE;
    const would_title_be_chunked_on_mobile = size > 80;
    //
    const { copy, copy_state } = useCopy();
    function on_copy_click() {
        copy(feature);
    }
    return (
        <div className='grid gap-8'>
            <div className='grid gap-4'>
                <label
                    htmlFor='keywords'
                    className='text-gray-700'
                >
                    <span>Compose your Key Product Feature here: </span>
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
                        set_feature(evt.target.value);
                    }}
                ></textarea>
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
