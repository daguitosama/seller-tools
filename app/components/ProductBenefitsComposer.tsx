import clsx from "clsx";
import { useRef, useState } from "react";
import { useCopy } from "~/hooks/useCopy";

interface Props {
    /**
     * Property description
     */
    // p: string;
}

/**
 * Component
 */
export const Product_Benefits_Composer = ({ ...props }: Props) => {
    // 115 <--- max longitud
    const [product_benefits, set_product_benefits] = useState<string>("");
    const is_description_field_touch = useRef<boolean>(false);
    //
    const SIZE_MAX = 115;
    const size = new Blob([product_benefits]).size;
    const is_under_size_limit = size <= 115;
    //
    const { copy, copy_state } = useCopy();
    function on_copy_click() {
        copy(product_benefits);
    }
    return (
        <div className='grid gap-8'>
            <div className='grid gap-4'>
                <label
                    htmlFor='keywords'
                    className='text-gray-700'
                >
                    <span>Compose your products benefits here: </span>
                    <span className={clsx(is_under_size_limit ? "text-green-600" : "text-red-600")}>
                        Size: {size}, max {SIZE_MAX}
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
                        set_product_benefits(evt.target.value);
                    }}
                ></textarea>
                \
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
