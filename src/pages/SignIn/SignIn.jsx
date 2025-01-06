import { Link, useNavigate } from 'react-router';
import './SignIn.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserId, getUsers, resetSignInErr, signInAsync, signInWithGoogle } from '../../services/actions/AuthAction';
import { Button } from 'react-bootstrap';

const SignIn = () => {

    const { isSignIn, isSignInErr } = useSelector(state => state.AuthReducer);

    const [signInInput, setSignInInput] = useState({
        email: '',
        pass: ''
    });

    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateInputs = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('pwd');

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    const handleInput = (e) => {
        setSignInInput({ ...signInInput, [e.target.name]: e.target.value })
    }

    const handleSubmit = (event) => {

        event.preventDefault();

        if(validateInputs()){

            dispatch(signInAsync(signInInput));
        }
    };

    const handleGoogle = () => {
        dispatch(signInWithGoogle());
    }

    const handleBack = () => {
        dispatch(resetSignInErr())
    }

    useEffect(() => {
        dispatch(getUserId());
    }, [])

    useEffect(() => {
        if (isSignIn) {
            navigate('/')
        }
    }, [isSignIn])

    useEffect(() => {
        dispatch(getUsers());
    }, [])
    
    return(
        <>
            {
                isSignInErr 
                ?   <div className="err signIn">
                        <h1 className="text-danger mt-5">{isSignInErr}</h1>
                        <Button className="mt-4 signUp" onClick={handleBack}>Go Back</Button>
                    </div> 
                :
                <div className="wrapper">
                    <div className="logo">
                        <img src="../src/assets/logo/logo.png" className='img-fluid' alt="Logo" />
                    </div>
                    <div className="text-center mt-4 name">
                        Lucille
                    </div>
                    <form className="p-3 mt-3 pb-0" onClick={handleSubmit}>
                        <div className="form-field d-flex align-items-center">
                            <span className="far fa-user"></span>
                            <input type="text" name="email" id="email" value={signInInput.email} onChange={handleInput} placeholder="Email" className={emailError ? 'input-error' : ''} />
                            {emailError && <span className="error-message">{emailErrorMessage}</span>}
                        </div>
                        <div className="form-field d-flex align-items-center">
                            <span className="fas fa-key"></span>
                            <input type="password" name="pass" id="pwd" value={signInInput.pass} onChange={handleInput} placeholder="Password" className={passwordError ? 'input-error' : ''} />
                            {passwordError && <span className="error-message">{passwordErrorMessage}</span>}
                        </div>
                        <button className="btn mt-3" onClick={validateInputs}>Login</button>
                    </form>
                    <span className='divider'>Or</span>
                    <button className="btn google" onClick={handleGoogle}>
                        Sign in with Google
                    </button>   
                    <div className="text-center fs-6 mt-3 divider mb-0">
                        <a href="#">Forget password?</a> or <Link to='/signUp' >Sign up</Link>
                    </div>
                </div>
            }
        </>
    )
}
export default SignIn;