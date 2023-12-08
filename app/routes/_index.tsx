import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "Dago's Remix CF.Pages baseline" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

type LoaderData = {
    beer: string;
};

export async function loader({ request, context }: LoaderFunctionArgs) {
    return json<LoaderData>({
        beer: context.env.BEER,
    });
}

export default function Index() {
    const { beer } = useLoaderData<typeof loader>();
    return (
        <div className='min-h-screen w-full pt-32'>
            <div className='grid gap-8  justify-center mx-auto text-center'>
                <div>
                    <p className='text-sm font-medium'>Distilled since christmas 2023</p>
                </div>
                <div>
                    <h1 className='text-4xl'>Dago's Remix C.Pages baseline template</h1>
                </div>
                <div>
                    <p className='text-2xl'>My beer from environment: {beer}</p>
                </div>
            </div>
        </div>
    );
}
