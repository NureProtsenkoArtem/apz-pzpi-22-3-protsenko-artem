import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { createPet } from '@api/pet.api';
import { ErrorType } from 'types/error/error.types';
import { CreatePetRequest } from '../types/createPetRequest';

export const useCreatePet = () => {
    const { t } = useTranslation();

    return useMutation<void, unknown, CreatePetRequest>({
        mutationFn: async (data: CreatePetRequest) => {
            const response = await createPet(data);
            return response.data;
        },
        onSuccess: () => {
            toast.success(t('pet_created_successfully'));
        },
        onError: (error) => {
            if (axios.isAxiosError(error) && error.response) {
                const data = error.response.data as ErrorType;
                toast.error(`${t('error')}: ${data.message}`);
            }
        },
    });
};
