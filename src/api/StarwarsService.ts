import { StarwarsPerson } from "./StarwarsPerson"

export const basePeopleUrl = "https://swapi.dev/api/people/"

export async function getPerson(person: number): Promise<StarwarsPerson> {
    const res = await fetch(basePeopleUrl + person)
    return await res.json()
}