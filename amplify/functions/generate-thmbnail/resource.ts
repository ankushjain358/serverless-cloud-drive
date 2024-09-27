import { defineFunction } from '@aws-amplify/backend';

export const generateThumbnail = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'generate-thmbnail',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
  runtime: 20,
});