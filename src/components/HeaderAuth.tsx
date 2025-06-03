import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { signOutAction } from "@/lib/actions";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4 text-white">
      Hey, {user.email}!
      <form action={signOutAction}>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
        >
          Sign out
        </button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors">
        <Link href="/sign-in">Sign in</Link>
      </button>
      <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors">
        <Link href="/sign-up">Sign up</Link>
      </button>
    </div>
  );
}
