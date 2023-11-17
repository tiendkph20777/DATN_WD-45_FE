// import React from 'react'
// import { auth, googleProvider } from "./Firebase";

import React, { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDlf-p6JnPqv6AOv7qiy1qDbJPtWbztWIU",
    authDomain: "datn-404316.firebaseapp.com",
    projectId: "datn-404316",
    storageBucket: "datn-404316.appspot.com",
    messagingSenderId: "58049053843",
    appId: "1:58049053843:web:154ee388e98fee46847966",
    measurementId: "G-M6W6K5CC4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const GoogleAuth = () => {
    const [user, setUser] = useState(null);

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            // Save user information to your database
            const userRef = collection(db, 'users');
            await addDoc(userRef, {
                uid: result.user.uid,
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
            });

        } catch (error) {
            console.error('Error signing in with Google:', error?.message);
        }
    };

    console.log('User Information:', {
        uid: user?.uid,
        fullName: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
    });
    useEffect(() => {
        // Check if the user is already signed in
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            }
        });
        return () => unsubscribe();
    }, []);

    const signOutHandler = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    };

    // console.log(user)

    return (
        <div>
            {user ? (
                <>
                    <p>Welcome, {user?.displayName}!</p>
                    <button onClick={signOutHandler}>Sign Out</button>
                </>
            ) : (
                <button onClick={signInWithGoogle} style={{ border: "0" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>
                </button>
            )
            }
        </div >

    );
}

export default GoogleAuth
