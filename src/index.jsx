const { QueryClient, QueryClientProvider, useQuery, useMutation } = require("react-query");
import {postTodo } from '../my-api'
const queryClient = new QueryClient();
 import { ReactQueryDevtools } from 'react-query/devtools'

function App(){

    return(
        <QueryClientProvider client={queryClient}>
            <Cars />
            <ReactQueryDevtools initialIsOpen={true}/> 
            
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
        <div>
            <ul>
                {data.map((car) =>(
                    <li key={car.id}>{car.make}</li>)
                )}
                {isFetching &&<p>Atualizando dados...</p>}
            </ul>
            <button onClick={() => {
            mutation.mutate({
                id: Date.now(),
                title: 'Do Laundry',
            })
            }}
        >
            Add
        </button>
        </div>);
    }
render(<App />, document.getElementById('root'))