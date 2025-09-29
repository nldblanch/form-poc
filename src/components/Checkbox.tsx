import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import styled from 'styled-components';
import type { FormData } from '../types';

interface CheckboxProps {
    name: string;
    control: Control<FormData>;
    disabled?: boolean;
    required?: boolean;
    label?: string;
}

const Container = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const CheckboxInput = styled.input<{ $disabled: boolean }>`
  width: 18px;
  height: 18px;
  margin: 0;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.6 : 1};
  accent-color: #007bff;
  transition: all 0.2s ease;

  &:focus {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }

  &:hover:not(:disabled) {
    transform: scale(1.05);
  }
`;

const Label = styled.label<{ $disabled: boolean }>`
  font-size: 0.95rem;
  font-weight: 500;
  color: #495057;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.6 : 1};
  line-height: 1.4;
  flex: 1;
  user-select: none;
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: block;
`;

const Checkbox: React.FC<CheckboxProps> = ({
    name,
    control,
    disabled = false,
    required = false,
    label
}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: required && !disabled ? 'This field is required' : false }}
            render={({ field, fieldState }) => (
                <Container>
                    <CheckboxInput
                        {...field}
                        type="checkbox"
                        checked={Boolean(field.value)}
                        onChange={(e) => field.onChange(e.target.checked)}
                        disabled={disabled}
                        $disabled={disabled}
                        id={name}
                    />
                    {label && (
                        <Label
                            htmlFor={name}
                            $disabled={disabled}
                        >
                            {label}
                        </Label>
                    )}
                    {fieldState.error && (
                        <ErrorMessage>{fieldState.error.message}</ErrorMessage>
                    )}
                </Container>
            )}
        />
    );
};

export default Checkbox;
