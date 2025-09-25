
import type { FormQuestion } from './types';
import Form from './components/Form';

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
  return <Form questions={formQuestions} />;
}

export default App
