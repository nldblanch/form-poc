import { supabase } from '../lib/supabase';
import type { FormData } from '../types';
import type { Database } from '../types/database';

type Question = Database['public']['Tables']['questions']['Row'];
type Answer = Database['public']['Tables']['answers']['Row'];
type QuestionInsert = Database['public']['Tables']['questions']['Insert'];
type AnswerInsert = Database['public']['Tables']['answers']['Insert'];

export class DatabaseService {
    /**
     * Save all questions to the database
     */
    static async saveQuestions(questions: Array<{ id: string; question: string }>): Promise<void> {
        try {
            // First, clear existing questions
            await supabase.from('questions').delete().neq('id', '');

            // Insert new questions
            const questionInserts: QuestionInsert[] = questions.map(q => ({
                id: q.id,
                question: q.question
            }));

            const { error } = await supabase
                .from('questions')
                .insert(questionInserts);

            if (error) {
                console.error('Error saving questions:', error);
                throw error;
            }

            console.log('Questions saved successfully');
        } catch (error) {
            console.error('Failed to save questions:', error);
            throw error;
        }
    }

    /**
     * Save form answers to the database
     */
    static async saveAnswers(formData: FormData): Promise<void> {
        try {
            // Generate a unique session ID for this form submission
            const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            const answerInserts: AnswerInsert[] = Object.entries(formData).map(([questionId, answer]) => ({
                id: sessionId,
                question_id: questionId,
                answer: answer
            }));

            const { error } = await supabase
                .from('answers')
                .insert(answerInserts);

            if (error) {
                console.error('Error saving answers:', error);
                throw error;
            }

            console.log('Answers saved successfully');
        } catch (error) {
            console.error('Failed to save answers:', error);
            throw error;
        }
    }

    /**
     * Get all questions from the database
     */
    static async getQuestions(): Promise<Question[]> {
        try {
            const { data, error } = await supabase
                .from('questions')
                .select('*')
                .order('created_at');

            if (error) {
                console.error('Error fetching questions:', error);
                throw error;
            }

            return data || [];
        } catch (error) {
            console.error('Failed to fetch questions:', error);
            throw error;
        }
    }

    /**
     * Get all answers for a specific session
     */
    static async getAnswers(sessionId: string): Promise<Answer[]> {
        try {
            const { data, error } = await supabase
                .from('answers')
                .select('*')
                .eq('id', sessionId)
                .order('created_at');

            if (error) {
                console.error('Error fetching answers:', error);
                throw error;
            }

            return data || [];
        } catch (error) {
            console.error('Failed to fetch answers:', error);
            throw error;
        }
    }

    /**
     * Get all answers (across all sessions)
     */
    static async getAllAnswers(): Promise<Answer[]> {
        try {
            const { data, error } = await supabase
                .from('answers')
                .select('*')
                .order('created_at');

            if (error) {
                console.error('Error fetching all answers:', error);
                throw error;
            }

            return data || [];
        } catch (error) {
            console.error('Failed to fetch all answers:', error);
            throw error;
        }
    }
}
