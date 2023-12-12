import clsx from "clsx";
import { useState } from "react";
import { useCopy } from "~/hooks/useCopy";

function string_to_unique_strings_set(str: string) {
    const lines = str.split("\n");
    var unique_strings_set: Set<string> = new Set();
    lines.forEach((line) => {
        const space_separated_words = line.split(" ");
        space_separated_words.forEach((word) => {
            unique_strings_set.add(word);
        });
    });

    return Array.from(unique_strings_set);
}

function to_space_separated_words_list(string_array: string[]) {
    return string_array.join(" ");
}

export function SearchTermsComposer() {
    const [raw_keywords, set_raw_keywords] = useState<string>("");

    const unique_key_words_list = to_space_separated_words_list(
        string_to_unique_strings_set(raw_keywords)
    );
    const optimized_keyword_list_render = <p>{unique_key_words_list}</p>;

    const { copy, copy_state } = useCopy();
    function on_copy_click() {
        copy(unique_key_words_list);
    }

    const unique_words_list_byte_size = new Blob([unique_key_words_list]).size;
    const unique_words_list_size_is_under_limit = unique_words_list_byte_size <= 249;
    return (
        <section className='grid gap-8'>
            <div className='grid gap-4'>
                <label
                    htmlFor='keywords'
                    className='text-gray-700'
                >
                    Put your keywords here, don't worry if you make repetitions, we fix that next,
                    you can even add new lines, is ok. Avoid using comas, you don't need them.
                </label>
                <textarea
                    className='w-full border border-gray-700 rounded-md shadow-md shadow-gray-300 p-4 '
                    id='keywords'
                    rows={10}
                    onChange={(evt) => {
                        set_raw_keywords(evt.target.value);
                    }}
                ></textarea>
            </div>
            <div className='grid gap-4'>
                <div className='flex items-center gap-4'>
                    <h3>Optimized set of unique terms, space separated</h3>
                    <p
                        className={clsx(
                            unique_words_list_size_is_under_limit
                                ? "text-green-700"
                                : " text-red-600"
                        )}
                    >
                        Size is {unique_words_list_byte_size},
                        {unique_words_list_size_is_under_limit
                            ? " under the limit"
                            : " over the limit"}{" "}
                        (249 bytes)
                    </p>
                </div>
                <div className='border border-gray-700 rounded-md shadow-md w-full min-h-[40px] p-4 '>
                    {optimized_keyword_list_render}
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
        </section>
    );
}
