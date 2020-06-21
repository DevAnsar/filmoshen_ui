import CategoryList from "../../../components/CategoryList";

export default function Category({slug}) {
    return <CategoryList categorySlug={slug} sub={true} />
}

Category.getInitialProps= async (ctx) =>{
    let {query}=ctx;
    return{
        slug:query.category,
    }
};