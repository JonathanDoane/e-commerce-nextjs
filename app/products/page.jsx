
import Link from "next/link";
import Layout from "../components/layout";

export default function Products() {
    return (
        <Layout>
            <Link href={'/products/new'} className="bg-green-400 py-1 px-2 rounded-lg">Add New Product</Link>
        </Layout>
    )
}