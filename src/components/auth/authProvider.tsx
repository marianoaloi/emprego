"use client"

import Button from "@mui/material/Button";
import { ThumbPhoto } from './authProvider.styled';
import { useAuth } from "./AuthContext";

export default function AuthProvider() {

    const { user, loading: authLoading, signInWithGoogle, logout, getAuthToken } = useAuth();

    if (authLoading) {
        return null;
    }

    return (
        <>
            {user ? (
                <Button variant="contained" color="secondary" onClick={logout}>
                    Logout{" "}
                    {user.photoURL && (
                        <ThumbPhoto
                            src={user.photoURL}
                            alt="User Avatar"
                        />
                    )}
                </Button>
            ) : (
                <Button variant="contained" color="primary" onClick={signInWithGoogle}>
                    Login with Google
                </Button>
            )}
        </>
    );
}