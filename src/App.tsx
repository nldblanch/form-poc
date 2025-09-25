
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import "./App.css";

// Types
interface Option {
  label: string;
  value: string;
}

interface Dependency {
  id: string;
  value: string;
}

interface FormQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiselect';
  options: Option[];
  required: boolean;
  dependsOn?: Dependency;
}

interface FormData {
  [key: string]: string | string[];
}

// Reusable Single Select Component
interface SingleSelectProps {
  name: string;
  control: Control<FormData>;
  options: Option[];
  disabled?: boolean;
  required?: boolean;
}

const SingleSelect: React.FC<SingleSelectProps> = ({ name, control, options, disabled = false, required = false }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? 'This field is required' : false }}
      render={({ field, fieldState }) => (
        <div className="single-select-container">
          <div className="button-group">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`option-button ${field.value === option.value ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
                onClick={() => !disabled && field.onChange(option.value)}
                disabled={disabled}
              >
                {option.label}
              </button>
            ))}
          </div>
          {fieldState.error && (
            <span className="error-message">{fieldState.error.message}</span>
          )}
        </div>
      )}
    />
  );
};

// Reusable Multi Select Component
interface MultiSelectProps {
  name: string;
  control: Control<FormData>;
  options: Option[];
  disabled?: boolean;
  required?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ name, control, options, disabled = false, required = false }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? 'This field is required' : false }}
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
          <div className="multi-select-container">
            <div className="button-group">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`option-button ${selectedValues.includes(option.value) ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
                  onClick={() => toggleOption(option.value)}
                  disabled={disabled}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {fieldState.error && (
              <span className="error-message">{fieldState.error.message}</span>
            )}
          </div>
        );
      }}
    />
  );
};

const formQuestions: FormQuestion[] = [
  {
    id: 'question1',
    question: 'Question 1: multiselect options',
    type: 'multiselect',
    options: [
      {
        label: 'Option 1',
        value: 'option1',
      },
      {
        label: 'Option 2',
        value: 'option2',
      },
      {
        label: 'Option 3',
        value: 'option3',
      },
    ],
    required: true,
  },
  {
    id: 'question2',
    question: 'Question 2: single select option',
    type: 'single',
    options: [
      {
        label: 'Option 1',
        value: 'option1',
      },
      {
        label: 'Option 2',
        value: 'option2',
      },
    ],
    required: true,
  },
  {
    id: 'question3',
    question: 'Question 3: depends on question 2 option 1',
    type: 'multiselect',
    options: [
      {
        label: 'Option 1',
        value: 'option1',
      },
      {
        label: 'Option 2',
        value: 'option2',
      },
    ],
    required: true,
    dependsOn: {
      id: 'question2',
      value: 'option1',
    },
  },
  {
    id: 'question4',
    question: 'Question 4: depends on question 2 option 2',
    type: 'multiselect',
    options: [
      {
        label: 'Option 1',
        value: 'option1',
      },
      {
        label: 'Option 2',
        value: 'option2',
      },
    ],
    required: true,
    dependsOn: {
      id: 'question2',
      value: 'option2',
    },
  },
];

function App() {
  const { control, watch, handleSubmit } = useForm<FormData>();
  const watchedValues = watch();

  // Check if a question should be enabled based on dependencies
  const isQuestionEnabled = (question: FormQuestion): boolean => {
    if (!question.dependsOn) return true;

    const dependencyValue = watchedValues[question.dependsOn.id];
    return dependencyValue === question.dependsOn.value;
  };

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    alert('Form submitted successfully! Check console for data.');
  };

  return (
    <div className="form-container">
      <h1>Dynamic Form with Conditional Questions</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {formQuestions.map((question) => {
          const isEnabled = isQuestionEnabled(question);

          return (
            <div key={question.id} className={`question-container ${!isEnabled ? 'disabled' : ''}`}>
              <h3 className="question-title">
                {question.question}
                {question.required && <span className="required">*</span>}
              </h3>

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
                <p className="dependency-note">
                  This question will be enabled when you select "{question.dependsOn.value}" in Question 2.
                </p>
              )}
            </div>
          );
        })}

        <button type="submit" className="submit-button">
          Submit Form
        </button>
      </form>
    </div>
  );
}

export default App
