import React, { useState, useEffect } from 'react';
import { BackButton, ButtonGroup, Container, SignInButton, SignUpButton } from './HomeBanner.style';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Link from 'next/link';

const Homebanner = () => {
  const [showForm, setShowForm] = useState<null | 'signIn' | 'signUp'>(null);

  useEffect(() => {
    const lastPage = localStorage.getItem('lastPage') as 'signIn' | 'signUp' | null;
    setShowForm(lastPage);
  }, []);

  const handleBack = () => {
    setShowForm(null);
    localStorage.removeItem('lastPage');
  };

  return (
    <Container>
      {showForm === null && <h1>Welcome to Our Homepage</h1>}
      {showForm === null ? (
        <ButtonGroup>
          <Link href="/login" passHref>
            <SignInButton variant={'text'}>
              Sign In
            </SignInButton>
          </Link>
          <Link href="/signup" passHref>
            <SignUpButton variant={'text'}>
              Sign Up
            </SignUpButton>
          </Link>
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
