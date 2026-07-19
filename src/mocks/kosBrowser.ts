import { setupWorker } from 'msw/browser';
import { pipelineHandlers } from '@/mocks/pipeline';

export const worker = setupWorker(...pipelineHandlers);





