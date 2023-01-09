export default function UserIdPgae (props) {
    return(
        <h1> {props.id} </h1>
    )
}

//we run this server side code for every request anyway
export async function getServerSideProps (context) { //we do not neet getStaticPaths at all 
    const {params} = context;
    const userId = params.uid;  // uid -> name of file ([uid].js)
    return { 
        props: {
            id: 'userid-' + userId
        }
    }
}