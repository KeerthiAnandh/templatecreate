import React from 'react';
import { FormContainer, FormTextField, SignInButton } from './HomeBanner.style';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX, PASSWORD_REGEX } from 'genpixels_ui_components/src/ui-components/forms/regex';
import FormPassword from 'genpixels_ui_components/src/ui-components/forms/input-password';
import { useRouter } from 'next/navigation';

const defaultValue = {
  email: '',
  password: '',
};

const SignInForms = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { dirtyFields, errors }
  } = useForm({
    defaultValues: defaultValue,
    mode: 'onChange',
    shouldFocusError: true
  });

  const onSubmit = async (data: any) => {
    try {
      const storedUserData = JSON.parse(localStorage.getItem('userData') || '{}');

      if (storedUserData.email === data.email && storedUserData.password === data.password) {
        console.log("Sign in successful");
        
        router.push('/temp');
      } else {
        console.error("Error: Incorrect credentials.");
      }
    } catch (error: any) {
      console.error("Error during sign in:", error.message);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <h2>Login Here</h2>
      <div>
        <label>Email</label>
        <FormTextField
          name="email"
          control={control}
          rules={{
            pattern: {
              value: EMAIL_REGEX,
              message: 'Please enter valid Email ID'
            },
            required: {
              value: true,
              message: 'Kindly enter Email'
            }
          }}
          showCheckIcon={!errors.email && dirtyFields.email}
          errorText={errors?.email?.message}
        />
      </div>
      <div>
        <label>Password</label>
        <FormPassword
          name="password"
          control={control}
          rules={{
            pattern: {
              value: PASSWORD_REGEX,
              message: 'Please enter valid Password'
            },
            required: {
              value: true,
              message: 'Kindly enter Password'
            }
          }}
          errorText={errors?.password?.message}
        />
      </div>
      <SignInButton type="submit" variant={'text'} >Sign In</SignInButton>
    </FormContainer>
  );
}

export default SignInForms;
