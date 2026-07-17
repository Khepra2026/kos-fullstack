import { setupWorker } from 'msw/browser';
import { kosPipelineHandlers } from '@/mocks/kosPipeline';

export const kosWorker = setupWorker(...kosPipelineHandlers);