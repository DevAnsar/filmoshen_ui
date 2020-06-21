import CrewPage from "./../../components/CrewPage";


export default function Crew({crew_slug}) {


    return(
        <CrewPage crew_slug={crew_slug} />
    )
}

Crew.getInitialProps= async (ctx) =>{
    let {query}=ctx;
    return{
        crew_slug:query.slug,
    }
};