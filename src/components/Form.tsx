import React, { useMemo, memo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import styled from 'styled-components';
import type { FormQuestion, FormData } from '../types';
import SingleSelect from './SingleSelect';
import MultiSelect from './MultiSelect';
import TextInput from './TextInput';
import TextArea from './TextArea';
import { DatabaseService } from '../services/database';

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

const QuestionContainer = styled.div<{ $hidden: boolean }>`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  display: ${props => props.$hidden ? 'none' : 'block'};

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
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Form submitted:', data);

      // Save answers to database
      await DatabaseService.saveAnswers(data);

      alert('Form submitted successfully! Data saved to database.');
    } catch (error) {
      console.error('Failed to save form data:', error);
      alert('Failed to save form data. Please try again.');
    }
  };

  const onError = (errors: any) => {
    console.log('Form validation errors:', errors);
    alert('Form has validation errors. Check console for details.');
  };

  return (
    <FormContainer>
      <Title>Dynamic Form with Conditional Questions</Title>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        {questions.map((question) => (
          <QuestionWrapper
            key={question.id}
            question={question}
            control={control}
          />
        ))}
        <SubmitButton type="submit">
          Submit Form
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

const QuestionWrapper = memo<{
  question: FormQuestion;
  control: any;
}>(({ question, control }) => {
  const getDependencyFields = useMemo(() => {
    if (!question.dependsOn) return [];

    if (Array.isArray(question.dependsOn)) {
      return question.dependsOn.map(dep => dep.id);
    } else {
      return [question.dependsOn.id];
    }
  }, [question.dependsOn]);

  // Use a selector to watch only the fields we need
  const dependencyValues = useWatch({
    control,
    name: getDependencyFields as readonly string[],
    exact: false
  });



  const isVisible = useMemo(() => {
    if (!question.dependsOn) return true;

    const valuesArray: any[] = Array.isArray(dependencyValues)
      ? (dependencyValues as any[])
      : getDependencyFields.length === 1
        ? [dependencyValues]
        : [];

    if (Array.isArray(question.dependsOn)) {
      return question.dependsOn.every(dep => {
        const idx = getDependencyFields.indexOf(dep.id);
        const depValue = idx >= 0 ? valuesArray[idx] : undefined;
        return depValue === dep.value;
      });
    } else {
      const idx = getDependencyFields.indexOf(question.dependsOn.id);
      const depValue = idx >= 0 ? valuesArray[idx] : undefined;
      return depValue === question.dependsOn.value;
    }
  }, [question.dependsOn, dependencyValues, getDependencyFields]);

  return (
    <QuestionContainer $hidden={!isVisible}>
      <QuestionTitle>
        {question.question}
        {question.required && isVisible && <Required>*</Required>}
      </QuestionTitle>

      {question.type === 'single' ? (
        <SingleSelect
          name={question.id}
          control={control}
          options={question.options}
          disabled={false} // Never disable - just hide
          required={question.required && isVisible}
        />
      ) : question.type === 'multiselect' ? (
        <MultiSelect
          name={question.id}
          control={control}
          options={question.options}
          disabled={false} // Never disable - just hide
          required={question.required && isVisible}
        />
      ) : question.type === 'text' ? (
        <TextInput
          name={question.id}
          control={control}
          disabled={false} // Never disable - just hide
          required={question.required && isVisible}
        />
      ) : (
        <TextArea
          name={question.id}
          control={control}
          disabled={false} // Never disable - just hide
          required={question.required && isVisible}
        />
      )}

      {!isVisible && question.dependsOn && (
        <DependencyNote>
          {Array.isArray(question.dependsOn) ? (
            <>This question will be shown when you select the required values in the dependency questions.</>
          ) : (
            <>This question will be shown when you select "{question.dependsOn.value}" in the previous question.</>
          )}
        </DependencyNote>
      )}
    </QuestionContainer>
  );
});

export default FormComponent;
