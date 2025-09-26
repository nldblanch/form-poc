import { DatabaseService } from '../services/database';
import { formQuestions } from '../questions';

/**
 * Initialize the database with all questions from the questions.ts file
 * This should be run once to populate the questions table
 */
export async function initializeDatabase(): Promise<void> {
    try {
        console.log('Initializing database with questions...');

        // Extract questions data
        const questionsData = formQuestions.map(q => ({
            id: q.id,
            question: q.question
        }));

        // Save questions to database
        await DatabaseService.saveQuestions(questionsData);

        console.log('Database initialized successfully with', questionsData.length, 'questions');
    } catch (error) {
        console.error('Failed to initialize database:', error);
        throw error;
    }
}

/**
 * Initialize database on app startup (optional)
 * Uncomment the line below if you want to auto-initialize on app load
 */
// initializeDatabase().catch(console.error);
