import React, { useState } from 'react';
import styled from 'styled-components';
import { DatabaseService } from '../services/database';
import { initializeDatabase } from '../utils/initializeDatabase';

const AdminContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  margin: 0.5rem;
  
  &:hover {
    background: #0056b3;
  }
  
  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
`;

const Status = styled.div<{ $success?: boolean; $error?: boolean }>`
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 6px;
  background: ${props =>
        props.$success ? '#d4edda' :
            props.$error ? '#f8d7da' :
                '#d1ecf1'
    };
  color: ${props =>
        props.$success ? '#155724' :
            props.$error ? '#721c24' :
                '#0c5460'
    };
  border: 1px solid ${props =>
        props.$success ? '#c3e6cb' :
            props.$error ? '#f5c6cb' :
                '#bee5eb'
    };
`;

const DatabaseAdmin: React.FC = () => {
    const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleInitializeDatabase = async () => {
        setLoading(true);
        setStatus(null);

        try {
            await initializeDatabase();
            setStatus({ type: 'success', message: 'Database initialized successfully with all questions!' });
        } catch (error) {
            setStatus({ type: 'error', message: `Failed to initialize database: ${error}` });
        } finally {
            setLoading(false);
        }
    };

    const handleGetQuestions = async () => {
        setLoading(true);
        setStatus(null);

        try {
            const questions = await DatabaseService.getQuestions();
            setStatus({ type: 'info', message: `Found ${questions.length} questions in database` });
            console.log('Questions:', questions);
        } catch (error) {
            setStatus({ type: 'error', message: `Failed to fetch questions: ${error}` });
        } finally {
            setLoading(false);
        }
    };

    const handleGetAllAnswers = async () => {
        setLoading(true);
        setStatus(null);

        try {
            const answers = await DatabaseService.getAllAnswers();
            setStatus({ type: 'info', message: `Found ${answers.length} answers in database` });
            console.log('All answers:', answers);
        } catch (error) {
            setStatus({ type: 'error', message: `Failed to fetch answers: ${error}` });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminContainer>
            <h2>Database Administration</h2>
            <p>Use these buttons to manage your database:</p>

            <div>
                <Button
                    onClick={handleInitializeDatabase}
                    disabled={loading}
                >
                    Initialize Database with Questions
                </Button>

                <Button
                    onClick={handleGetQuestions}
                    disabled={loading}
                >
                    Get Questions Count
                </Button>

                <Button
                    onClick={handleGetAllAnswers}
                    disabled={loading}
                >
                    Get All Answers
                </Button>
            </div>

            {status && (
                <Status
                    $success={status.type === 'success'}
                    $error={status.type === 'error'}
                >
                    {status.message}
                </Status>
            )}
        </AdminContainer>
    );
};

export default DatabaseAdmin;
