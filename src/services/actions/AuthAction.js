import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db, provider } from "../../firebaseConfig";

export const userSignUpSuc = (users) => {

    return{
        type : 'SIGNUP_SUC',
        payload : users
    }
}

export const userSignUpRej = (errMsg) => {

    return{
        type : 'SIGNUP_REJ',
        payload : errMsg
    }
}

export const userSignInRej = (errMsg) => {

    return{
        type : 'SIGNIN_REJ',
        payload : errMsg
    }
}

export const userSignInSuc = (user) => {

    return{
        type : 'SIGNIN_SUC',
        payload : user
    }
}

export const resetSignUpErr = () => {
    return{
        type : 'RESET_SIGNUP_ERR'
    }
}

export const resetSignInErr = () => {
    return{
        type : 'RESET_SIGNIN_ERR'
    }
}

export const userLogout = () => {

    return{
        type : 'SIGNOUT'
    }
}

export const getUsersSuc = (users) => {

    return{
        type : 'GET_USERS',
        payload : users
    }
}

export const getUsers = () => {

    return async dispatch => {

        try{

            let getData = (await getDocs(collection(db, 'users'))).docs.map(doc => ({...doc.data(), uid : doc.id }));         

            dispatch(getUsersSuc(getData));
        }catch(err){

            console.log(err);
        }
    }
}

export const signUpAsync = (users) => {

    return async dispatch => {

        createUserWithEmailAndPassword(auth, users.email, users.pass)
        .then((userCred) => {
            
            userCred.user.displayName = users.uname;
            
            const signUpUser = {
                uid : userCred.user.uid,
                uname : userCred.user.displayName,
                email : userCred.user.email
            }

            localStorage.setItem('userLoginId', JSON.stringify(signUpUser.uid));
            
            addDoc(collection(db, "users"), signUpUser);

            dispatch(userSignUpSuc(signUpUser));
        })
        .catch((err) => {
            
            console.log(err.code);
            
            if(err.code == 'auth/email-already-in-use'){
                
                dispatch(userSignUpRej('User Already Exits.'));
            }
        })

    }

}

export const signInAsync = (user) => {

    return async dispatch => {

        signInWithEmailAndPassword(auth, user.email, user.pass)
        .then((res) => {

            let signInUser = {
                uid : res.user.uid,
                email : res.user.email,
                uname : res.user.displayName
            };

            localStorage.setItem('userLoginId', JSON.stringify(signInUser.uid));

            dispatch(userSignInSuc(signInUser));
        })
        .catch((err) => {

            console.log(err);

            if(err.code == 'auth/invalid-credential'){
                
                dispatch(userSignInRej('Username Or Password Is Invalid.'));
            }
        })
    }

}

export const signInWithGoogle = () => {

    return async dispatch => {

        try{

            const res = await signInWithPopup(auth, provider);

            const userData = {
                uid: res.user.uid,
                email: res.user.email,
                displayName: res.user.displayName,
                photoURL: res.user.photoURL
            }

            const getUser = await getDocs(collection(db, 'users'));

            const userExist = getUser.docs.some(doc => doc.data().uid === userData.uid);
            
            if(!userExist){

                await addDoc(collection(db, "users"), userData);
            }
            
            localStorage.setItem('userLoginId', JSON.stringify(userData.uid));

            dispatch(userSignInSuc(res.user));
        }catch(err){

            console.log(err);
        }
    }
}

export const getUserId = () => {

    return async dispatch => {

        try{

            let getLoginId = JSON.parse(localStorage.getItem('userLoginId'));

            let getUser = await getDocs(collection(db, 'users'));

            let singleUser = getUser.docs.find((doc) => doc.data().uid === getLoginId);

            if(singleUser){

                let UserData = singleUser.data();
                dispatch(userSignInSuc(UserData));
            }

        }catch(err){

            console.log(err);
        }
    }
}

export const userLogoutAsync = () => {

    return async dispatch => {

        try{
            
            await signOut(auth);
            localStorage.removeItem('userLoginId');
            console.log("LOGOUT DONE");
            
            dispatch(userLogout());
        }catch(err){
            
            console.log(err);
        }
        
    }
}