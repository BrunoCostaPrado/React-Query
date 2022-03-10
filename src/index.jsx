const { QueryClient, QueryClientProvider, useQuery, useMutation } = require("react-query");

const queryClient = new QueryClient();

function App(){

    return(
        <QueryClientProvider client={queryClient}>
            <Cars />
            <ReactQueryDevtools>
            
        </QueryClientProvider>
    )
}
async function fetchCars(){
    const res=await fetch('/data.json');
return res.json();
}

function Cars(){
    const{data, status, isFetching}=useQuery('cars',fetchCars);
    if(status==='loading'){
        return <p>Loading...</p>;
    }
    if(status==='error'){
        return <p>Error!</p>;
    }
const mutation=useMutation(postTodo,{
    onSuccess:()=>{
        queryClient.invalidateQueries('cars')
    },
})

    return(
    <ul>
        {data.map((car) =>(
            <li key={car.id}>{car.make}</li>)
        )}
        {isFetching &&<p>Atualizando dados...</p>}
    </ul>
    );
}