const { QueryClient, QueryClientProvider, useQuery } = require("react-query");

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
    const{data, status}=useQuery('cars',fetchCars);
    if(status==='loading'){
        return <p>Loading...</p>;
    }
    if(status==='error'){
        return <p>Error!</p>;
    }
}