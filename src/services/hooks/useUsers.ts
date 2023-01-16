import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { Users } from "../../pages/users";
import { api } from "../api";

interface GetUsersReponse{
    totalCount: number;
    users: Users[]
}

export async function getUsers(page: number): Promise<GetUsersReponse>{
        //refech
        const { data, headers } = await api.get('users', {
            params: {
                page,
            }
        });
        
        const totalCount = Number(headers['x-total-count'])
        
        const users = data.users.map((user: Users) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                created_at: new Date(user.created_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                }),
            };
        })

        return { users, totalCount};
}


export function useUsers(page: number, options?: UseQueryOptions){
    return useQuery(['users', page ], () => getUsers(page), {
        staleTime: 1000 * 60 * 10, // 10 minutes
        ...options
    }
 ) as UseQueryResult<GetUsersReponse, unknown>
}