"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AuthFeedback() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const loginStatus = searchParams.get("login");

        if (loginStatus === "google-success") {
            toast.success("Successfully logged in with Google!");

            // Clear the query parameter without refreshing the page
            const params = new URLSearchParams(searchParams.toString());
            params.delete("login");
            const newPath = window.location.pathname + (params.toString() ? `?${params.toString()}` : "");
            router.replace(newPath, { scroll: false });
        }
    }, [searchParams, router]);

    return null;
}
