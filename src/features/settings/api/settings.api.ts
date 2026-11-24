import { supabase } from "../../../shared/lib/supabase";
import type { ProfileFormData } from "../types/settingsTypes";

export const updateUserProfile = async ({ first_name, last_name, email }: ProfileFormData) => {
  const { data, error } = await supabase.auth.updateUser({
    data: {
      first_name,
      last_name,
      email
    },
  });

  if (error) throw new Error(error.message);
  return data.user;
}