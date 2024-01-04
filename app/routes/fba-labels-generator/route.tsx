import type { MetaFunction } from "@remix-run/cloudflare";
import { useState } from "react";
import Barcode, { type Options } from "react-jsbarcode";

export const meta: MetaFunction = () => {
    return [{ title: "FBA Shipping Labels Generator" }];
};

type Labels_Data = {
    label: Label_Data;
    quantity: number;
};
type Label_Data = {
    product_name: string;
    id: string;
    condition: string;
};
const default_labels_data: Labels_Data = {
    label: { product_name: "Product Name", id: "855722007437", condition: "New" },
    quantity: 30,
};
function update_page_title(new_title: string) {
    const shortDate = new Intl.DateTimeFormat("en", { dateStyle: "short" }).format;
    if (typeof document == "undefined") return;
    const title = document.querySelector("title");
    if (!title) return;

    title.innerHTML = `FBA_LABELS_${new_title}_${shortDate(new Date())}`;
}

export default function FBA_Shipping_Labels_Gen_Route() {
    const [labels_data, set_labels_data] = useState<Labels_Data>(default_labels_data);
    function on_update(new_data: Labels_Data) {
        set_labels_data(new_data);
        update_page_title(new_data.label.product_name);
    }

    return (
        <div>
            <div className='pt-20 print:hidden grid gap-10'>
                <h1 className=' text-2xl text-center font-mono'>FBA Shipping Labels Generator</h1>
                {/* <String_Visualizer text='DAMANCI travel size heat ...smooths & adds shine (2oz)' /> */}
                <Controls
                    on_update={on_update}
                    default_data={default_labels_data}
                />
                <div className='max-w-[690px] px-20 mx-auto grid gap-4 text-sm pb-10'>
                    <p>
                        To Save the PDF, <em>attempt to print</em>,{" "}
                        <code className='font-mono bg-gray-100 rounded-sm p-1  '>[CMD + P]</code> on
                        the Mac,{" "}
                        <code className='font-mono bg-gray-100 rounded-sm p-1 '>[CTRL + P]</code> on
                        Windows & Linux. Then choose <em>"Save as PDF"</em>, instead of sending to
                        the printer.
                    </p>
                    <p>
                        Don't worry for how it looks like here, it has been properly calibrated for
                        the PDF, instead this web pag.
                    </p>
                </div>
            </div>
            <div className='mt-10 print:mt-0'>
                <Labels_Sheet labels_data={labels_data} />
            </div>
        </div>
    );
}
interface FormElements extends HTMLFormControlsCollection {
    product_name: HTMLInputElement;
    product_id: HTMLInputElement;
    product_condition: HTMLInputElement;
    quantity: HTMLInputElement;
}
interface Labels_Form_Elements extends HTMLFormElement {
    readonly elements: FormElements;
}
function Controls({
    on_update,
    default_data,
}: {
    on_update: (new_values: Labels_Data) => void;
    default_data: Labels_Data;
}) {
    function on_submit(evt: React.FormEvent<Labels_Form_Elements>) {
        evt.preventDefault();
        const formData = new FormData(evt.currentTarget);
        on_update({
            label: {
                condition: String(formData.get("product_condition")),
                id: String(formData.get("product_id")),
                product_name: String(formData.get("product_name")),
            },
            quantity: parseInt(String(formData.get("quantity"))),
        });
    }
    return (
        <div className='w-full  px-8  flex justify-center'>
            <div className='bg-white p-8 rounded-2xl '>
                <form
                    className='grid gap-8'
                    onSubmit={on_submit}
                >
                    <div className='grid md:grid-cols-2 gap-10'>
                        <div className='grid gap-8'>
                            <div className='grid gap-2'>
                                <label
                                    htmlFor='product_name'
                                    className='block'
                                >
                                    Product Name
                                </label>
                                <input
                                    id='product_name'
                                    name='product_name'
                                    type='text'
                                    className='border border-gray-500 p-2 rounded-md'
                                    placeholder="Your product's name"
                                    defaultValue={default_data.label.product_name}
                                    required
                                />
                            </div>
                            <div className='grid gap-2'>
                                <label htmlFor='product_id'>
                                    <span>Product Identifier </span>
                                    <span className='text-gray-500 text-sm'>
                                        (ASIN, UPC ... the one you need)
                                    </span>
                                </label>
                                <input
                                    id='product_id'
                                    name='product_id'
                                    type='text'
                                    className='border border-gray-500 p-2 rounded-md'
                                    placeholder="Your product's ID"
                                    defaultValue={default_data.label.id}
                                    required
                                />
                            </div>
                        </div>
                        <div className='grid gap-8'>
                            <div className='grid gap-2'>
                                <label
                                    htmlFor='product_condition'
                                    className='block'
                                >
                                    Product Condition
                                </label>
                                <input
                                    id='product_condition'
                                    name='product_condition'
                                    type='text'
                                    className='border border-gray-500 p-2 rounded-md'
                                    required
                                    defaultValue={default_data.label.condition}
                                />
                            </div>
                            <div className='grid gap-2'>
                                <label htmlFor='quantity'>
                                    <span>Quantity </span>
                                    <span className='text-xss text-gray-400'>
                                        max is 60, generate again if need more, good reason behind
                                    </span>
                                </label>
                                <input
                                    id='quantity'
                                    name='quantity'
                                    type='number'
                                    min={1}
                                    max={60}
                                    className='border border-gray-500 p-2 rounded-md'
                                    required
                                    defaultValue={default_data.quantity}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button className='bg-black text-white font-mono py-4 leading-none rounded-md w-full'>
                            Generate
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function array_of_length(length: number): Array<Number> {
    var result: Number[] = [];
    for (let i = 0; i < length; i++) {
        result.push(i);
    }
    return result;
}
function Labels_Sheet({ labels_data }: { labels_data: Labels_Data }) {
    let temp_array = array_of_length(labels_data.quantity);
    const set_to_apply_padding_x = [
        1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 37, 40, 43, 46, 49, 52, 55, 58,
    ];
    function needs_px(index: number): boolean {
        return set_to_apply_padding_x.includes(index);
    }
    return (
        <div className='flex  justify-center'>
            <ul className='w-full grid grid-cols-3'>
                {temp_array.map((i) => {
                    return (
                        <li
                            key={String(i)}
                            className={`block py-[0.15in] ${needs_px(+i) ? "px-[0.05in]" : ""}`}
                        >
                            {/* ${needs_px(+i) ? "px-[0.125in]" : ""} */}
                            {/* px-[0.25in]  */}
                            {/* <p>{i}</p> */}
                            <Label label_data={labels_data.label} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function format_product_name_like_FBA_template_gen_tool_does(product_name: string) {
    // get 3 strings as
    // 1: first 25 chars
    // 2: '...'
    // 3: last 25 chars
    // join them;

    if (product_name.length < 26) {
        return product_name;
    }
    const s1 = product_name.substring(0, 24);
    const s2 = "...";
    const s3 = product_name.substring(product_name.length - 26);

    return `${s1}${s2}${s3}`;
}

function Label({ label_data }: { label_data: Label_Data }) {
    const bar_code_options: Options = {
        height: 20,
        width: 1.2,
        fontSize: 14,
        // format: "CODE128C",
        format: "CODE128A",
        // marginRight: 0,
        // valid: '',
        // margin: 0,
        marginTop: 0,
        marginBottom: 5,
        marginRight: 0,
        marginLeft: 0,
        font: "Deja Vu Sans Condensed",
        valid: (valid) => {
            if (!valid) {
                // alert("The supplied value is not valid, please try again.");
                window.location.reload();
            }
        },
    };
    return (
        <div className=' flex flex-col items-start'>
            <Barcode
                className=''
                value={label_data.id}
                options={bar_code_options}
            />
            <p className='mt-2 text-xss font-condensed tracking-tighter'>
                {format_product_name_like_FBA_template_gen_tool_does(label_data.product_name)}
            </p>
            <p className='text-xs font-medium font-condensed'>{label_data.condition}</p>
        </div>
    );
}

// function String_Visualizer({ text }: { text: string }) {
//     return (
//         <div className='font-mono border border-black'>
//             <ul className='flex justify-center'>
//                 {Array.from(text).map((letter, idx) => {
//                     return (
//                         <li
//                             key={idx}
//                             className={`${
//                                 idx == text.length - 1 ? " " : "border-r border-black "
//                             } p-2`}
//                         >
//                             <p className='text-sm'>{idx}</p>
//                             <p>{letter}</p>
//                         </li>
//                     );
//                 })}
//             </ul>
//         </div>
//     );
// }
