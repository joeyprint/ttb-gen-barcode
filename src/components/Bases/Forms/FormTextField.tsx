import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

type TextFieldProps = {
  label?: string;
} & React.ComponentProps<'input'>;

export type FormTextFieldProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & TextFieldProps;

const FormTextField = <TFieldValues extends FieldValues = FieldValues>(
  props: FormTextFieldProps<TFieldValues>,
) => {
  const {
    field: { ref, onChange: controllerOnChange, ...field },
    fieldState: { error },
  } = useController({ ...props, name: props.name });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    controllerOnChange(event);

    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <>
      <Label>{props.label}</Label>
      <Input
        ref={ref}
        {...props}
        {...field}
        onChange={handleChange}
        className={cn('mt-2', props.className)}
      />
      {!!error?.message && <p className='text-red-500'>{error.message}</p>}
    </>
  );
};

export default FormTextField;
