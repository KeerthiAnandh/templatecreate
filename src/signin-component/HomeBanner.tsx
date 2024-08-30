import React, { useState, useEffect } from 'react';
import { BackButton, ButtonGroup, Container, SignInButton, SignUpButton } from './HomeBanner.style';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Homebanner = () => {
  const [showForm, setShowForm] = useState<null | 'signIn' | 'signUp'>(null);

  useEffect(() => {
    const lastPage = localStorage.getItem('lastPage') as 'signIn' | 'signUp' | null;
    setShowForm(lastPage);
  }, []);

  const handleShowForm = (page: 'signIn' | 'signUp') => {
    setShowForm(page);
    localStorage.setItem('lastPage', page);
  };

  const handleBack = () => {
    setShowForm(null);
    localStorage.removeItem('lastPage');
  };

  return (
    <Container>
      {showForm === null && <h1>Welcome to Our Homepage</h1>}
      {showForm === null ? (
        <ButtonGroup>
          <SignInButton onClick={() => handleShowForm('signIn')} variant={'text'}>
            Sign In
          </SignInButton>
          <SignUpButton onClick={() => handleShowForm('signUp')} variant={'text'}>
            Sign Up
          </SignUpButton>
        </ButtonGroup>
      ) : (
        <div>
          {showForm === 'signIn' && <SignIn />}
          {showForm === 'signUp' && <SignUp />}
          <BackButton onClick={handleBack} variant={'text'}>
            Back
          </BackButton>
        </div>
      )}
    </Container>
  );
};

export default Homebanner;
