import { Link, useNavigate } from 'react-router';
import '../SignIn/SignIn.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetSignUpErr, signInWithGoogle, signUpAsync } from '../../services/actions/AuthAction';
import { Button } from 'react-bootstrap';

const SignUp = () => {

    const [signUpInput, setSignUpInput] = useState({
        uname : '',
        email : '',
        pass : ''
    });

    const [usernameError, setUsernameError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const { isCreate, isSignUpErr } = useSelector(state => state.AuthReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateInputs = () => {
        const username = document.getElementById('uname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('pwd').value;

        let isValid = true;

        if(!username || username.length < 3){
            setUsernameError(true);
            setUsernameErrorMessage('Username must be at least 3 characters.');
            isValid = false;
        }else{
            setUsernameError(false);
            setUsernameErrorMessage('');
        }

        if(!email || !/\S+@\S+\.\S+/.test(email)){
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        }else{
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if(!password || password.length < 6){
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    const handleInput = (e) => {
        setSignUpInput({ ...signUpInput, [e.target.name] : e.target.value })
    }

    const handleSubmit = (event) => {

        event.preventDefault();

        if(validateInputs()){
  
            dispatch(signUpAsync(signUpInput));
            navigate('/signIn');
        }
    };

    const handleGoogle = () => {
        dispatch(signInWithGoogle());
        navigate('/')
    }

    const handleBack = () => {
        dispatch(resetSignUpErr())
    }

    useEffect(() => {
        if(isCreate){
            navigate('/signIn')
        }
    }, [isCreate])

    return(
        <>
            {
                isSignUpErr ? 
                    <div className="err addRec">
                        <h1 className="text-danger mt-5">{isSignUpErr}</h1>
                        <Button className="mt-4 signUp" onClick={handleBack}>Go Back</Button>
                    </div>
                :
                <div className="wrapper">
                    <div className="logo">
                        <img src="../src/assets/logo/logo.png" alt="Logo" />
                    </div>
                    <div className="text-center mt-4 name">
                        Lucille
                    </div>
                    <form className="p-3 mt-3 pb-0" onClick={handleSubmit}>
                        <div className="form-field d-flex align-items-center">
                            <span className="far fa-user"></span>
                            <input type="text" name="uname" id="uname" value={signUpInput.uname} onChange={handleInput} placeholder="Username" className={usernameError ? 'input-error' : ''} />
                            {usernameError && <div className="error-message">{usernameErrorMessage}</div>}
                        </div>
                        <div className="form-field d-flex align-items-center">
                            <span className="far fa-user"></span>
                            <input type="email" name="email" id="email" value={signUpInput.email} onChange={handleInput} placeholder="Email" className={emailError ? 'input-error' : ''} />
                            {emailError && <div className="error-message">{emailErrorMessage}</div>}
                        </div>
                        <div className="form-field d-flex align-items-center">
                            <span className="fas fa-key"></span>
                            <input type="password" name="pass" id="pwd" onChange={handleInput} value={signUpInput.pass} placeholder="Password" className={passwordError ? 'input-error' : ''} />
                            {passwordError && <div className="error-message">{passwordErrorMessage}</div>}
                        </div>
                        <button className="btn mt-3" onClick={validateInputs}>Sign Up</button>
                    </form>
                    <span className='divider'>Or</span>
                    <button className="btn google" onClick={handleGoogle}>
                        Sign in with Google
                    </button>   
                    <div className="text-center fs-6 mt-3 mb-0 divider sign-btn">
                        <a href="#" className='sign-btn'>Forget password?</a> or <Link to='/signIn' className='sign-btn' >Sign In</Link>
                    </div>
                </div>
            }
        </>
    )
}
export default SignUp;