
import Form from './components/Form';
import DatabaseAdmin from './components/DatabaseAdmin';
import { formQuestions } from './questions';

function App() {
  return (
    <div>
      {process.env.NODE_ENV === 'development' && <DatabaseAdmin />}
      <Form questions={formQuestions} />
    </div>
  );
}

export default App
