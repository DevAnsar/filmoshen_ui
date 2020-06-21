import CategoryList from "../../../components/CategoryList/m";

export default function Category({slug }) {
    return <CategoryList categorySlug={slug}  />
}

Category.getInitialProps= async (ctx) =>{
    let {query}=ctx;
    return{
        slug:query.category,
    }
};