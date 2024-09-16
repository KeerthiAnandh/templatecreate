import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { FormContainer, FormTextField, SignInButton } from './HomeBanner.style';
import { EMAIL_REGEX, PASSWORD_REGEX } from 'genpixels_ui_components/src/ui-components/forms/regex';
import FormPassword from 'genpixels_ui_components/src/ui-components/forms/input-password';
import { postData } from '@/service/authservice';

const SignInForms = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { dirtyFields, errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    shouldFocusError: true
  });

  const onSubmit = async (data: any) => {
    try {
      const { email, password } = data;
      const requestData = { email, password };
      const response = await postData("http://e-commerce.ap-south-1.elasticbeanstalk.com/api/users/login", requestData);
      console.log("Post Response:", response);

      if (response.statusCode === 200) 
        {
        console.log("Server authentication successful");
        localStorage.setItem('userData', JSON.stringify(response.data));
        console.log("Sign in successful");
        router.push('/temp');  
      }
       else 
       {
        console.error("Error: Unable to sign in. Server returned an error.");
        alert("Error: Incorrect credentials. Please try again.");
      }
    } catch (error: any) 
    {
      console.error("Error during sign in:", error.message);
      alert("An error occurred during sign in. Please try again.");
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
              message: 'Please enter a valid Email ID'
            },
            required: {
              value: true,
              message: 'Kindly enter your Email'
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
              message: 'Please enter a valid Password'
            },
            required: {
              value: true,
              message: 'Kindly enter your Password'
            }
          }}
          errorText={errors?.password?.message}
        />
      </div>
      <SignInButton type="submit" variant={'text'}>Sign In</SignInButton>   
    </FormContainer>
  );
};

export default SignInForms;
