import { apiUrl } from '@/config';
import useSWR from 'swr';


const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Erro ao buscar dados');
    }
    return response.json();
};

export const useFetch = (path: string) => {
    const { data, error } = useSWR(`${apiUrl}/${path}`, fetcher);

    console.log(`${apiUrl}/users`, data, error);
    const isLoading = !data && !error;
    return { data, error, isLoading };
};

// export const getUsers = () => {
//     const r = fetcher(`${apiUrl}/users`);
//     console.log(r);
//     const { data, error, isLoading } = useSWR<UserModel[]>(`${apiUrl}/users`, fetcher);
//     console.log(`${apiUrl}/users`, data, error);

//     return {
//         users: data,
//         isLoading: isLoading,
//         isError: error,
//     };
// };
