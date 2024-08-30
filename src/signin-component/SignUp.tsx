// SignUp.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX, PASSWORD_REGEX } from 'genpixels_ui_components/src/ui-components/forms/regex';
import FormPassword from 'genpixels_ui_components/src/ui-components/forms/input-password';
import FormPhoneNumberInput from 'genpixels_ui_components/src/ui-components/forms/input-phone-number';
import { FormTextField } from './HomeBanner.style';

const defaultValue = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
};

const SignUp = () => {
    const {
        control,
        handleSubmit,
        watch,
        formState: { dirtyFields, errors }
    } = useForm({
        defaultValues: defaultValue,
        mode: 'onChange',
        shouldFocusError: true
    });

    const passwordValue = watch('password');

    const onSubmit = (data: any) => {
        console.log("Form Data: ", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Forms</h1>
            <div>
                <label>Name</label>
                <FormTextField
                    name="name"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: 'Kindly enter your Name'
                        }
                    }}
                    showCheckIcon={!errors.name && dirtyFields.name}
                    errorText={errors?.name?.message}
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
                <label>Confirm Password</label>
                <FormPassword
                    name="confirmPassword"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: 'Kindly enter your Password again'
                        },
                        validate: (value: string) =>
                            value === passwordValue || 'Confirm Password do not match'
                    }}
                    errorText={errors?.confirmPassword?.message}
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
