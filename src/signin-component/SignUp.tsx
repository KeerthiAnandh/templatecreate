import React from 'react';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX, PASSWORD_REGEX } from 'genpixels_ui_components/src/ui-components/forms/regex';
import FormPassword from 'genpixels_ui_components/src/ui-components/forms/input-password';
import FormPhoneNumberInput from 'genpixels_ui_components/src/ui-components/forms/input-phone-number';
import { FormTextField } from './HomeBanner.style';
import { postData } from '../service/authservice';


const PHONE_REGEX = /^[+]?[\d\s()-]{7,15}$/;

const defaultValue = {
  lastName: '',
  firstname: '',
  email: '',
  password: '',
  phoneNumber: ''
};

const SignUp = () => {
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
      const sanitizedPhoneNumber = data.phoneNumber.replace(/\D/g, '');

      const newData = {
        firstName: data.firstname,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phoneNumber: sanitizedPhoneNumber
      };
      debugger
      const response = await postData("http://e-commerce.ap-south-1.elasticbeanstalk.com/api/users/signup", newData);
      console.log("Post Response:", response);

      console.log("Full Response Data:", response);

      if (response.statusCode === 200) {
        localStorage.setItem('userData', JSON.stringify(newData));
        alert("Sign up successful! You can now sign in.");
      }
      else {
        console.error("Error Response from Server:", response);
        alert(`Sign up failed: ${response.message || 'Please try again.'}`);
      }
    } catch (error: any) {
      console.error("Error posting data:", error);
      alert(`An error occurred during sign-up: ${error.message || 'Please try again.'}`);
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Sign Up Here</h3>
      <div>
        <label>First Name</label>
        <FormTextField
          name="firstname"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Kindly enter your Name'
            }
          }}
          showCheckIcon={!errors.firstname && dirtyFields.firstname}
          errorText={errors?.firstname?.message}
        />
      </div>
      <div>
        <label>Last Name</label>
        <FormTextField
          name="lastName"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Kindly enter your Name'
            }
          }}
          showCheckIcon={!errors.lastName && dirtyFields.lastName}
          errorText={errors?.lastName?.message}
        />
      </div>
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
        <label>Phone Number</label>
        <FormPhoneNumberInput
          name="phoneNumber"
          control={control}
          rules={{
            pattern: {
              value: PHONE_REGEX, // Use updated regex
              message: 'Please enter a valid phone number'
            },
            required: {
              value: true,
              message: 'Kindly enter your phone number'
            }
          }}
          errorText={errors?.phoneNumber?.message}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUp;
