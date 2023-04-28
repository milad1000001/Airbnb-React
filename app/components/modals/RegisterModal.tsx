'use client';

import { axios } from 'axios'
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import { useState } from 'react';

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: {
            errors
        } } = useForm<FieldValues>({
            defaultValues: {
                name: '',
                email: '',
                password: ''
            }
        })
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/register', data)
            .then(() => {

            })
            .catch((error) => {
                console.log(error)
            })
            .finaly(() => {
                setIsLoading(false)
            })
    }

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
        />
    );
}

export default RegisterModal;