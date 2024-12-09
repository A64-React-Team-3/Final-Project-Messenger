import './Register.css';
import { useEffect, useState } from 'react';
import { validEmailRegex, validUsernameRegex, validPasswordRegex } from '../../common/constants';
import { getUserByHandle, createUser } from '../../services/user.service';
import { registerUser } from '../../services/auth.service';

/**
 * Register component for user registration.
 * 
 * @param {Object} props - Component props.
 * @param {Function} props.handleShowLogin - Function to show the login view.
 * @returns {JSX.Element} The Register component.
 */
export default function Register({ handleShowLogin }: { handleShowLogin: () => void }): JSX.Element {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');

  const [user, setUser] = useState({
    handle: '',
    email: '',
    username: '',
    password: '',
  });


  /**
   * Handles the registration process.
   * 
   * @async
   * @function handleRegister
   * @returns {Promise<void>}
   */
  const handleRegister = async (): Promise<void> => {
    user.handle = user.username;
    if (!(isEmailValid && isUsernameValid && isPasswordValid && isPasswordMatch)) {
      alert('Please enter valid information');
      return;
    }
    try {
      const dbUser = await getUserByHandle(user.handle);
      if (dbUser.exists()) {
        alert('User already exists');
        return;
      }
      const credentials = await registerUser(user.email, user.password);
      await createUser(user.handle, user.email, user.username, credentials.user.uid);
      handleShowLogin();
    }
    catch (err: any) {
      alert(err.message);
    }
  }

  /**
   * Updates the user state based on input field changes.
   * 
   * @param {string} field - The field to update.
   * @returns {Function} The event handler for input change.
   */
  const updateUser = (field: string): React.ChangeEventHandler<HTMLInputElement> => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [field]: e.target.value
    });
    if (field === 'email' || field === 'username' || field === 'password') {
      setHasStartedTyping(true);
    }
  }

  const updateConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  }

  // const validateField = (field: string): void => {
  //   if (validEmailRegex.test(field)) {
  //     setIsEmailValid(true);
  //   } else {
  //     setIsEmailValid(false);
  //   }
  //   console.log(isEmailValid);
  // }

  useEffect(() => {
    if (validEmailRegex.test(user.email) && hasStartedTyping) {
      setIsEmailValid(true);
    } else if (hasStartedTyping) {
      setIsEmailValid(false);
    }

    if (validUsernameRegex.test(user.username) && hasStartedTyping) {
      setIsUsernameValid(true);
    } else if (hasStartedTyping) {
      setIsUsernameValid(false);
    }

    if (validPasswordRegex.test(user.password) && hasStartedTyping) {
      setIsPasswordValid(true);
    } else if (hasStartedTyping) {
      setIsPasswordValid(false);
    }

    if (user.password === confirmPassword && user.password.length > 0) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
  }, [user.email, hasStartedTyping, user.username, user.password, confirmPassword]);


  return (
    <div className="card backdrop-opacity backdrop-invert bg-primary/40 shadow-2xl shadow-primary-100/50 w-96">
      <div className="card-body">
        <h2 className="card-title">Register</h2>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path
              d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input value={user.email} type="text" className="grow" placeholder="Email" onChange={updateUser("email")} />
        </label>
        {!isEmailValid && hasStartedTyping && <p className="text-red-500 text-xs">Please enter a valid email address</p>}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input value={user.username} type="text" className="grow" placeholder="Username" onChange={updateUser("username")} />
        </label>
        {!isUsernameValid && hasStartedTyping && <p className="text-red-500 text-xs">Username must be between 5 and 35 characters</p>}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd" />
          </svg>
          <input type="password" className="grow" value={user.password} placeholder='Password' onChange={updateUser("password")} />
        </label>
        {!isPasswordValid && hasStartedTyping && <p className="text-red-500 text-xs">Password must be between 6 and 15 characters</p>}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd" />
          </svg>
          <input type="password" className="grow" value={confirmPassword} placeholder='confirm password' onChange={updateConfirmPassword} />
        </label>
        {!isPasswordMatch && hasStartedTyping && <p className="text-red-500 text-xs">Passwords do not match</p>}
        <div className="card-actions justify-end">
          <button className="btn btn-info" onClick={handleRegister}>Register</button>
          <button className="btn btn-accent" onClick={handleShowLogin}>Back to Login</button>
        </div>
      </div>
    </div>
  )
}