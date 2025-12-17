import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, sendEmailVerification } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [roleLoading, setRoleLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('');
    const [userStatus, setUserStatus] = useState('')

    const registerWithEmailPassword = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass);
    }

    const handleGoogleSignin = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        return signOut(auth);
    }

    const sendVerificationEmail = (user) => {
        return sendEmailVerification(user);
    }

    console.log(user);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {         
            setUser(currentUser);
            setLoading(false);
        });
    
        return () => {
            unsubscribe();
        }
    },[]);

    useEffect(() => {
        if(!user) return;
        axios.get(`http://localhost:5000/users/role/${user?.email}`)
        .then(res => {
            setRole(res.data.role);
            setUserStatus(res.data.status)
            setRoleLoading(false);
        })
    }, [user]);
    console.log(role);



    const authData = {
        registerWithEmailPassword,
        setUser,
        user,
        handleGoogleSignin,
        loading,
        logOut,
        sendVerificationEmail,
        role,
        roleLoading,
        userStatus
    }

    return <AuthContext.Provider value={authData}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;