import React from 'react';
import { signInWithGoogle } from '../../services/auth';

const LoginButton: React.FC = () => (
  <button onClick={signInWithGoogle}>Sign in with Google</button>
);

export default LoginButton;
