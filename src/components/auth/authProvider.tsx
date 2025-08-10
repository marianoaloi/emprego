"use client"

import { clearToken, setToken, getUser, User } from "@/lib/features/auth/authSlice";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { ThumbPhoto } from './authProvider.styled';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { authFirebase, GoogleAuthProvider, signInWithPopup, signOut } from "./firebaseConfig";

export default function AuthProvider() {
    const user = useAppSelector(getUser);
    const dispatch = useAppDispatch();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Optionally, render a skeleton or nothing until mounted
        return null;
    }

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            const userCred = await signInWithPopup(authFirebase, provider);
            // The signed-in user info.
            const user = userCred.user;
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = await user?.getIdToken();
            if (token) {
                dispatch(setToken({
                    token: token!,
                    user: {
                        email: user.email!,
                        name: user.displayName!,
                        photoURL: user.photoURL!
                    } as User,
                    expiresIn: 3600 // 1 hour expiration
                }));
            }
            console.log("Signed in user:", user);
            return user;
        } catch (error: any) {
            // Handle Errors here.
            const errorMessage = error.message;
            // The email of the user's account used.
            // The AuthCredential type that was used.
            console.error("Error signing in with Google:", errorMessage);
            throw error;
        }
    };

    const signOutUser = async () => {
        try {
            await signOut(authFirebase);

            dispatch(clearToken());
            console.log("User signed out.");
        } catch (error) {
            console.error("Error signing out:", error);
            throw error;
        }
    };
    return (
        <>
            {user ? (
                <Button variant="contained" color="secondary" onClick={signOutUser}>
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