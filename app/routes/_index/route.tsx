import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { DescriptionComposer } from "~/components/DescriptionComposer";
import { DirectionsComposer } from "~/components/DirectionsComposer";
import { KeyProductFeatureComposer } from "~/components/KeyProductFeatureComposer";
import { Product_Benefits_Composer } from "~/components/ProductBenefitsComposer";
import { SearchTermsComposer } from "~/components/SearchTermsComposer";
import { Title_Composer } from "~/components/TitleComposer";
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
                <Title_Composer />
                <KeyProductFeatureComposer />
                <Product_Benefits_Composer />
                <SearchTermsSection />
                <DescriptionSection />
                <DirectionsSection />
            </div>
        </div>
    );
}

function Menu() {
    return (
        <div className='grid gap-4'>
            <div className=''>
                <h1 className='text-4xl'>Amazon Seller Tools</h1>
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

function SearchTermsSection() {
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
            <SearchTermsComposer />
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
                    use it effectively
                </a>
                .
            </p>
            <p>Tips for drafting and optimizing your search terms include the following:</p>

            <ul className=' list-disc pl-4'>
                <li>Maintain the text length limit of search terms.</li>
                <li>Make use of synonyms.</li>
                <li>Use spelling variations, but don’t include common misspellings.</li>
                <li>Include abbreviations.</li>
                <li>Use all lowercase letters.</li>
                <li>Avoid punctuation marks such as semicolons, colons, and dashes.</li>
                <li>Separate words with spaces.</li>
                <li>Avoid repetitions.</li>
                <li>
                    Avoid articles, prepositions, or other short words such as “a,” “an,” “and,”
                    “by,” “for,” “of,” “the,” or “with.”
                </li>
                <li>Use either singular or plural words.</li>
            </ul>
            <p>
                Extracted from Amazon Seller Search Terms{" "}
                <a
                    href='https://sellercentral.amazon.com/help/hub/reference/G23501'
                    className='text-blue-600'
                >
                    Reference
                </a>
                .
            </p>
        </div>
    );
}

function DescriptionSection() {
    return (
        <section className='grid gap-8'>
            <div className='grid gap-4'>
                <h2
                    id='description-composer'
                    className='text-2xl'
                >
                    Description Composer
                </h2>
            </div>
            <DescriptionComposer />
            {/* <Description_Resources /> */}
        </section>
    );
}

function DirectionsSection() {
    return (
        <section className='grid gap-8'>
            <div className='grid gap-4'>
                <h2
                    id='description-composer'
                    className='text-2xl'
                >
                    Description Composer
                </h2>
            </div>
            <DirectionsComposer />
            {/* <Description_Resources /> */}
        </section>
    );
}
