import { Label } from '@/components/ui/label';
import * as SelectPrimitive from '@radix-ui/react-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

type SelectionItem = { value: string; label: string };

type SelectionProps = {
  label?: string;
  defaultValue?: SelectionItem;
  options: Array<SelectionItem>;
  placeholder?: string;
  className?: string;
} & Omit<React.ComponentProps<typeof SelectPrimitive.Root>, 'defaultValue'>;

export type FormSelectionProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & SelectionProps;

const FormSelection = <TFieldValues extends FieldValues = FieldValues>(
  props: FormSelectionProps<TFieldValues>,
) => {
  const { label, options, placeholder, defaultValue, ...restProps } = props;

  const {
    field: { ref, onChange: controllerOnChange, value, ...field },
    fieldState: { error },
  } = useController({ ...props, name: props.name });

  const defaultSelectedOptions = useMemo(() => {
    if (defaultValue) return defaultValue.value;
    return null;
  }, []);

  const selectedValue = useMemo(() => {
    if (value) return value.value;
    return null;
  }, [value]);

  const handleChange = (value: string) => {
    const selectedOption = options.find((option) => option.value === value);
    controllerOnChange(selectedOption);
  };

  return (
    <>
      <Label className='text-base'>{props.label}</Label>
      <Select
        onValueChange={handleChange}
        defaultValue={defaultSelectedOptions}
        value={selectedValue}
        {...restProps}
        {...field}
      >
        <SelectTrigger className={cn('mt-2 w-full', restProps.className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {!!error?.message && (
        <p className='text-sm text-red-500 mt-1'>{error.message}</p>
      )}
    </>
  );
};

export default FormSelection;
