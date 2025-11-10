import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useForm } from 'react-hook-form';
// import { createEditCabin } from '../../services/apiCabins';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

export default function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
    const { createCabin, isCreating } = useCreateCabin();
    const { isEditing, editCabin } = useEditCabin();

    const isWorking = isCreating || isEditing;

    const { id: editID, ...editValues } = cabinToEdit;

    const isEditSession = Boolean(editID);

    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    function onSubmit(data) {
        const image = typeof data.image === 'string' ? data.image : data.image?.[0];

        if (isEditSession)
            editCabin(
                { newCabinData: { ...data, image }, id: editID },
                {
                    onSuccess: (data) => reset(),
                }
            );
        else
            createCabin(
                { ...data, image: image },
                {
                    onSuccess: (data) => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
    }

    function onError(errors) {
        // console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
            <FormRow label="Cabin name" error={errors.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register('name', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow label="Max capacity" error={errors.maxCapacity?.message}>
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
                    {...register('maxCapacity', {
                        required: 'This field is required',
                        min: { value: 1, message: 'Minimum is 1' },
                    })}
                />
            </FormRow>

            <FormRow label="Regular price" error={errors.regularPrice?.message}>
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isWorking}
                    {...register('regularPrice', {
                        required: 'This field is required',
                        min: { value: 50, message: 'Minimum is 50' },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    disabled={isWorking}
                    defaultValue={0}
                    {...register('discount', {
                        required: 'This field is required',
                        validate: (value) =>
                            value <= getValues().regularPrice ||
                            'Discount should be less than regular price',
                    })}
                />
            </FormRow>

            <FormRow label="Description" error={errors.description?.message}>
                <Textarea
                    type="number"
                    id="description"
                    disabled={isWorking}
                    defaultValue=""
                    {...register('description', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow label="Image">
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register('image', {
                        required: isEditSession ? false : 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? `Change Cabin` : 'Create New Cabin'}
                </Button>
            </FormRow>
        </Form>
    );
}
