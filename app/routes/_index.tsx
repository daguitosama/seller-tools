import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useRef, useState } from "react";
import clsx from "clsx";
import { clear } from "isbot";
export const meta: MetaFunction = () => {
    return [
        { title: "Amazon product listing tools" },
        { name: "description", content: "Compose your product listings fields with ease" },
    ];
};

export async function loader({ request, context }: LoaderFunctionArgs) {
    return json({});
}

export default function Index() {
    return (
        <div className='min-h-screen w-full py-20'>
            <div className='max-w-screen-lg px-8 mx-auto grid gap-14'>
                <Menu />
                <SearchTermsComposer />
            </div>
        </div>
    );
}

function Menu() {
    return (
        <div className='grid gap-4'>
            <div className=''>
                <h1 className='text-4xl'>Amazon product listing tools</h1>
            </div>
            <div className=''>
                <ul className='flex items-center justify-start gap-8'>
                    <li>
                        <a
                            href='#description-composer'
                            className='text-blue-600 '
                        >
                            Description composer
                        </a>
                    </li>
                    <li>
                        <a
                            href='#search-terms-composer'
                            className='text-blue-600 '
                        >
                            Search terms composer
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
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

function useCopy() {
    const [state, set_state] = useState<"idle" | "copying" | "copied" | "error-while-copying">(
        "idle"
    );
    var tid_1 = useRef<ReturnType<typeof setTimeout> | undefined>(),
        tid_2 = useRef<ReturnType<typeof setTimeout> | undefined>();

    async function copy(text: string) {
        console.log("Running copy");
        clearTimeout(tid_1?.current);
        clearTimeout(tid_2?.current);
        console.log("timeouts cleared ");
        //
        const type = "text/plain";
        const blob = new Blob([text], { type });
        const data = [new ClipboardItem({ [type]: blob })];
        //
        try {
            set_state("copying");
            console.log("copying... ");
            await navigator.clipboard.write(data);
            set_state("copied");
            console.log("copied ");

            tid_1.current = setTimeout(() => {
                set_state("idle");
                console.log("going to idle ");
            }, 5_000);
        } catch (e) {
            console.error(e);
            set_state("error-while-copying");
            tid_1.current = setTimeout(() => {
                set_state("idle");
            }, 5_000);
        }
    }
    return { copy, copy_state: state };
}

function SearchTermsComposer() {
    const [raw_keywords, set_raw_keywords] = useState<string>("");

    const unique_key_words_list = to_space_separated_words_list(
        string_to_unique_strings_set(raw_keywords)
    );
    const optimized_keyword_list_render = <p>{unique_key_words_list}</p>;

    const { copy, copy_state } = useCopy();
    function on_copy_click() {
        copy(unique_key_words_list);
    }
    return (
        <section className='grid gap-8'>
            <div className='grid gap-4'>
                <h2
                    id='search-terms-composer'
                    className='text-2xl'
                >
                    Search Terms Composer
                </h2>
            </div>
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
                <h3>Optimized set of unique terms, space separated</h3>
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
            <Search_Terms_Resources />
        </section>
    );
}

function Search_Terms_Resources() {
    return (
        <div className='grid gap-4'>
            <h3 className='text-xl'>Resources</h3>
            <p>
                To learn more about search terms see the field{" "}
                <a
                    className='text-blue-600'
                    href='https://sellercentral.amazon.com/help/hub/reference/F2C2L6RCFZGWBXC'
                >
                    limits
                </a>{" "}
                and how to{" "}
                <a
                    href='https://sellercentral.amazon.com/help/hub/reference/G23501'
                    className='text-blue-600'
                >
                    use search terms effectively
                </a>{" "}
                .
            </p>
        </div>
    );
}
