// SignIn.tsx

import React from 'react';
import { FormContainer, FormTextField, SignInButton } from './HomeBanner.style';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX, PASSWORD_REGEX } from 'genpixels_ui_components/src/ui-components/forms/regex';
import FormPassword from 'genpixels_ui_components/src/ui-components/forms/input-password';

const defaultValue = {
  email: '',
  password: '',
};

const SignInForms = () => {
  const {
    control,
    handleSubmit,
    formState: { dirtyFields, errors }
  } = useForm({
    defaultValues: defaultValue,
    mode: 'onChange',
    shouldFocusError: true
  });

  const onSubmit = (data: any) => {
    console.log("Form Data: ", data);
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign In</h2>
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
                <div>        
        {/* <ForgotPasswordLink>Forgot Password?</ForgotPasswordLink> */}
      </div>
      <SignInButton type="submit" variant={'text'}>Sign In</SignInButton>
    </FormContainer>
  );
}

export default SignInForms;
