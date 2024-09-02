import React from 'react';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX, PASSWORD_REGEX } from 'genpixels_ui_components/src/ui-components/forms/regex';
import FormPassword from 'genpixels_ui_components/src/ui-components/forms/input-password';
import FormPhoneNumberInput from 'genpixels_ui_components/src/ui-components/forms/input-phone-number';
import { FormTextField } from './HomeBanner.style';
import { postData } from '../service/authservice';

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
            const newData = { 
                firstName: data.firstname, 
                lastName: data.lastName, 
                email: data.email, 
                password: data.password, 
                phoneNumber: data.phoneNumber 
            };
            
            // Save user data to local storage
            localStorage.setItem('userData', JSON.stringify(newData));

            const response = await postData("http://e-commerce.ap-south-1.elasticbeanstalk.com/api/users/signup", newData);
            console.log("Post Response:", response);
        } catch (error: any) {
            console.error("Error posting data:", error.message);
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
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default SignUp;
