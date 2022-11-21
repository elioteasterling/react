import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
    MutationFunction,
  } from '@tanstack/react-query'
import { useState } from 'react'
import { getPerson } from './StarwarsService'

// Create a client
const queryClient = new QueryClient()
const queryKey: string[] = ['starwarsPerson']

export function StarwarsPersonDisplayer() {
    return (
        // Provide the client to your App
        <QueryClientProvider client={queryClient}>
            <StarwarsPerson />
        </QueryClientProvider>
    )
}

const mf: MutationFunction<any, any> = async (variables: any) => await variables()

function StarwarsPerson() {
    // Form State
    const [v, setV] = useState('')
    // Access the client
    const queryClient = useQueryClient()
    // Queries
    const query = useQuery({ queryKey, queryFn: async () => await getPerson(Number(v)) as any})
    // Mutations
    const mutation = useMutation({
        mutationFn: mf,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey })
        },
    })

    return (
        <div>
            <ul>
                {query.data?.map((sw: any) => (
                    <li key={sw.id}>{sw.title}</li>
                ))}
            </ul>

            <input type="number" value={v} onChange={(e) => setV(e.target.value)} />

            <button
                onClick={() => {
                    mutation.mutate({                  // UPDATE StarwarsPerson with values:
                        "name": "Luke Skywalker",
                        "height": "172",
                        "mass": "77",
                        "hair_color": "blond",
                        "skin_color": "fair",
                        "eye_color": "blue",
                        "birth_year": "19BBY",
                        "gender": "male",
                        "homeworld": "https://swapi.dev/api/planets/1/",
                        "films": [
                            "https://swapi.dev/api/films/2/",
                            "https://swapi.dev/api/films/6/",
                            "https://swapi.dev/api/films/3/",
                            "https://swapi.dev/api/films/1/",
                            "https://swapi.dev/api/films/7/"
                        ],
                        "species": [
                            "https://swapi.dev/api/species/1/"
                        ],
                        "vehicles": [
                            "https://swapi.dev/api/vehicles/14/",
                            "https://swapi.dev/api/vehicles/30/"
                        ],
                        "starships": [
                            "https://swapi.dev/api/starships/12/",
                            "https://swapi.dev/api/starships/22/"
                        ],
                        "created": "2014-12-09T13:50:51.644000Z",
                        "edited": "2014-12-20T21:17:56.891000Z",
                        "url": "https://swapi.dev/api/people/1/"
                    })
                }}>
                Find your Star Wars Character
            </button>
        </div>
    )
}
