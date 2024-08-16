import { supabase } from "@/supabaseClient";
import { User } from "@/types/user.type";
import { PostgrestError } from "@supabase/supabase-js";
import { TABLES } from "@/interfaces/tables.enum";

interface UsersResponse {
    data: User[] | null;
    error: PostgrestError | null;
}

export const getUsers = async (): Promise<UsersResponse> => {
    const response = await supabase.from(TABLES.USERS).select('*');
    const { data, error } = response;

    if (error) {
        console.error(error);
        return { data: null, error };
    }

    return { data, error: null };
}

export const getUserById: (id: string) => Promise<User | null> = async (id) => {
    const { data, error } = await supabase.from(TABLES.USERS).select('*').eq('user_UID', id).single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}
