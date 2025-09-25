import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import type { FormQuestion, FormData } from '../types';
import SingleSelect from './SingleSelect';
import MultiSelect from './MultiSelect';

interface FormProps {
  questions: FormQuestion[];
}

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const QuestionContainer = styled.div<{ $disabled: boolean }>`
  background: ${props => props.$disabled ? '#f1f3f4' : '#f8f9fa'};
  border: 1px solid ${props => props.$disabled ? '#dee2e6' : '#e9ecef'};
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  opacity: ${props => props.$disabled ? 0.6 : 1};

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const QuestionTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
`;

const Required = styled.span`
  color: #dc3545;
  margin-left: 0.25rem;
`;

const DependencyNote = styled.p`
  color: #6c757d;
  font-size: 0.875rem;
  font-style: italic;
  margin-top: 0.75rem;
  padding: 0.75rem;
  background: #e9ecef;
  border-radius: 4px;
  border-left: 3px solid #6c757d;
`;

const SubmitButton = styled.button`
  background: #28a745;
  border: none;
  border-radius: 6px;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
  align-self: center;
  min-width: 200px;

  &:hover {
    background: #218838;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(40, 167, 69, 0.25);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid #28a745;
    outline-offset: 2px;
  }
`;

const FormComponent: React.FC<FormProps> = ({ questions }) => {
  const { control, watch, handleSubmit } = useForm<FormData>();
  const watchedValues = watch();

  // Check if a question should be enabled based on dependencies
  const isQuestionEnabled = useCallback((question: FormQuestion): boolean => {
    if (!question.dependsOn) return true;

    const dependencyValue = watchedValues[question.dependsOn.id];
    return dependencyValue === question.dependsOn.value;
  }, [watchedValues]);

  const onSubmit = (data: FormData) => {
    // Filter out disabled questions from the submitted data
    const filteredData: FormData = {};

    questions.forEach((question) => {
      const isEnabled = isQuestionEnabled(question);
      if (isEnabled && data[question.id] !== undefined) {
        filteredData[question.id] = data[question.id];
      }
    });

    console.log('Form submitted:', filteredData);
    alert('Form submitted successfully! Check console for data.');
  };

  return (
    <FormContainer>
      <Title>Dynamic Form with Conditional Questions</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {questions.map((question) => {
          const isEnabled = isQuestionEnabled(question);

          return (
            <QuestionContainer key={question.id} $disabled={!isEnabled}>
              <QuestionTitle>
                {question.question}
                {question.required && <Required>*</Required>}
              </QuestionTitle>

              {question.type === 'single' ? (
                <SingleSelect
                  name={question.id}
                  control={control}
                  options={question.options}
                  disabled={!isEnabled}
                  required={question.required}
                />
              ) : (
                <MultiSelect
                  name={question.id}
                  control={control}
                  options={question.options}
                  disabled={!isEnabled}
                  required={question.required}
                />
              )}

              {!isEnabled && question.dependsOn && (
                <DependencyNote>
                  This question will be enabled when you select "{question.dependsOn.value}" in Question 2.
                </DependencyNote>
              )}
            </QuestionContainer>
          );
        })}

        <SubmitButton type="submit">
          Submit Form
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default FormComponent;
