export interface Database {
    public: {
        Tables: {
            questions: {
                Row: {
                    id: string;
                    question: string;
                    created_at: string;
                };
                Insert: {
                    id: string;
                    question: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    question?: string;
                    created_at?: string;
                };
            };
            answers: {
                Row: {
                    id: string;
                    question_id: string;
                    answer: string | string[] | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    question_id: string;
                    answer: string | string[] | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    question_id?: string;
                    answer?: string | string[] | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
        };
    };
}
