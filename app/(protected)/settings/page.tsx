import { auth, signOut } from "@/auth"

const SettingsPage = async () => {
    const session = await auth();
    console.log("code is in settings");
    return <div>
        {JSON.stringify(session)}
        <form action = {async () => {
            "use server";

            await signOut({redirectTo: "/auth/login"});
            console.log("Server action");
        }}>
            <button type = "submit" className="bg-black text-white"  >Sign out</button>
        </form>
    </div>
}

export default SettingsPage;
