import { useRef, useState } from "react";

export function useCopy() {
    const [state, set_state] = useState<"idle" | "copying" | "copied" | "error-while-copying">(
        "idle"
    );
    var tid_1 = useRef<ReturnType<typeof setTimeout> | undefined>(),
        tid_2 = useRef<ReturnType<typeof setTimeout> | undefined>();

    async function copy(text: string) {
        clearTimeout(tid_1?.current);
        clearTimeout(tid_2?.current);
        //
        const type = "text/plain";
        const blob = new Blob([text], { type });
        const data = [new ClipboardItem({ [type]: blob })];
        //
        try {
            set_state("copying");
            await navigator.clipboard.write(data);
            set_state("copied");

            tid_1.current = setTimeout(() => {
                set_state("idle");
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
