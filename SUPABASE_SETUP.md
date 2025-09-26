# Supabase Database Setup

This guide will help you set up the Supabase database for storing form questions and answers.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and anon key

## 2. Set Up Environment Variables

Create a `.env.local` file in your project root with:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 3. Create Database Tables

Run the SQL commands from `database-schema.sql` in your Supabase SQL editor:

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `database-schema.sql`
4. Run the SQL commands

## 4. Install Dependencies

```bash
npm install @supabase/supabase-js
```

## 5. Initialize the Database

1. Start your development server: `npm run dev`
2. Open the app in your browser
3. Use the "Initialize Database with Questions" button in the admin panel
4. This will populate the questions table with all the form questions

## Database Schema

### Questions Table

- `id` (TEXT, PRIMARY KEY): The question ID from your form
- `question` (TEXT): The question text
- `created_at` (TIMESTAMP): When the question was added

### Answers Table

- `id` (TEXT): Session ID to group answers together
- `question_id` (TEXT, FOREIGN KEY): References questions.id
- `answer` (JSONB): The answer data (can be string, array, etc.)
- `created_at` (TIMESTAMP): When the answer was created
- `updated_at` (TIMESTAMP): When the answer was last updated

## Usage

### Saving Form Data

When a user submits the form, all answers are automatically saved to the database with a unique session ID.

### Retrieving Data

Use the `DatabaseService` class methods:

- `DatabaseService.getQuestions()` - Get all questions
- `DatabaseService.getAnswers(sessionId)` - Get answers for a specific session
- `DatabaseService.getAllAnswers()` - Get all answers across all sessions

## Security

The database uses Row Level Security (RLS) with public read/write access. For production, you should:

1. Create authenticated users
2. Set up proper RLS policies
3. Use service role keys for admin operations
