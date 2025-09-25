import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import styled from 'styled-components';
import type { FormData } from '../types';

interface TextAreaProps {
    name: string;
    control: Control<FormData>;
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
    rows?: number;
}

const Container = styled.div`
  margin-bottom: 0.5rem;
`;

const TextArea = styled.textarea<{ $disabled: boolean }>`
  width: 100%;
  max-width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #495057;
  background: ${props => props.$disabled ? '#f8f9fa' : '#ffffff'};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'text'};
  transition: all 0.2s ease;
  opacity: ${props => props.$disabled ? 0.6 : 1};
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  &:hover:not(:disabled) {
    border-color: #007bff;
  }

  &::placeholder {
    color: #6c757d;
    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: 1rem; /* Prevents zoom on iOS */
  }
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: block;
`;

const TextAreaComponent: React.FC<TextAreaProps> = ({
    name,
    control,
    disabled = false,
    required = false,
    placeholder,
    rows = 4
}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: required && !disabled ? 'This field is required' : false }}
            render={({ field, fieldState }) => (
                <Container>
                    <TextArea
                        {...field}
                        placeholder={placeholder}
                        disabled={disabled}
                        rows={rows}
                        $disabled={disabled}
                    />
                    {fieldState.error && (
                        <ErrorMessage>{fieldState.error.message}</ErrorMessage>
                    )}
                </Container>
            )}
        />
    );
};

export default TextAreaComponent;
