'use server';
/**
 * @fileOverview A flow to generate trivia questions for the game.
 *
 * - generateTriviaQuestions - A function that generates a set of trivia questions.
 * - GenerateTriviaQuestionsOutput - The return type for the generateTriviaQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TriviaQuestionSchema = z.object({
    id: z.number().describe('The ID of the trivia gate this question is for, from 1 to 3.'),
    question: z.string().describe('The trivia question about Google history.'),
});

const GenerateTriviaQuestionsOutputSchema = z.object({
    questions: z.array(TriviaQuestionSchema).length(3).describe('An array of 3 unique trivia questions.'),
});

export type GenerateTriviaQuestionsOutput = z.infer<typeof GenerateTriviaQuestionsOutputSchema>;

export async function generateTriviaQuestions(): Promise<GenerateTriviaQuestionsOutput> {
  return generateTriviaQuestionsFlow();
}

const prompt = ai.definePrompt({
  name: 'generateTriviaQuestionsPrompt',
  output: {schema: GenerateTriviaQuestionsOutputSchema},
  prompt: `You are a trivia master. Generate exactly 3 unique and interesting trivia questions about the history of Google. Each question should be assigned an ID from 1 to 3. Do not repeat questions you have generated before.`,
});

const generateTriviaQuestionsFlow = ai.defineFlow(
  {
    name: 'generateTriviaQuestionsFlow',
    outputSchema: GenerateTriviaQuestionsOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
