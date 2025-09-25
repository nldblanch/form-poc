import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import styled from 'styled-components';
import type { Option, FormData } from '../types';

interface MultiSelectProps {
  name: string;
  control: Control<FormData>;
  options: Option[];
  disabled?: boolean;
  required?: boolean;
}

const Container = styled.div`
  margin-bottom: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

const OptionButton = styled.button<{ $selected: boolean; $disabled: boolean }>`
  background: ${props => props.$selected ? '#007bff' : '#ffffff'};
  border: 2px solid ${props => props.$selected ? '#007bff' : '#dee2e6'};
  border-radius: 6px;
  padding: 0.75rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${props => props.$selected ? '#ffffff' : props.$disabled ? '#6c757d' : '#495057'};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  min-width: 100px;
  text-align: center;
  opacity: ${props => props.$disabled ? 0.5 : 1};

  &:hover:not(:disabled) {
    border-color: #007bff;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 123, 255, 0.15);
  }

  &:hover:disabled {
    transform: none;
    box-shadow: none;
  }

  &:focus-visible {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
  }
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: block;
`;

const MultiSelect: React.FC<MultiSelectProps> = ({
  name,
  control,
  options,
  disabled = false,
  required = false
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required && !disabled ? 'This field is required' : false }}
      render={({ field, fieldState }) => {
        const selectedValues = (field.value as string[]) || [];

        const toggleOption = (optionValue: string) => {
          if (disabled) return;

          const newValues = selectedValues.includes(optionValue)
            ? selectedValues.filter((val: string) => val !== optionValue)
            : [...selectedValues, optionValue];

          field.onChange(newValues);
        };

        return (
          <Container>
            <ButtonGroup>
              {options.map((option) => (
                <OptionButton
                  key={option.value}
                  type="button"
                  $selected={selectedValues.includes(option.value)}
                  $disabled={disabled}
                  onClick={() => toggleOption(option.value)}
                  disabled={disabled}
                >
                  {option.label}
                </OptionButton>
              ))}
            </ButtonGroup>
            {fieldState.error && (
              <ErrorMessage>{fieldState.error.message}</ErrorMessage>
            )}
          </Container>
        );
      }}
    />
  );
};

export default MultiSelect;
