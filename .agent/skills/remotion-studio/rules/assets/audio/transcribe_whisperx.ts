
import { exec } from 'child_process';

import { promisify } from 'util';

import fs from 'fs/promises';

import path from 'path';



const execAsync = promisify(exec);



export interface WordTimestamp {

  word: string;

  start: number;

  end: number;

  score?: number;

}



interface TranscribeOptions {

  model?: 'tiny' | 'base' | 'small' | 'medium' | 'large-v3';

  language?: string;

  batchSize?: number;

  useFlashAttention?: boolean;

}



/**

 * Transcribes audio using insanely-fast-whisper (GPU accelerated).

 * Requires: pipx install insanely-fast-whisper

 */

export async function transcribeAudio(

  inputPath: string,

  options: TranscribeOptions = {}

): Promise<WordTimestamp[]> {

  const {

    model = 'large-v3',

    language = 'en',

    batchSize = 24,

    useFlashAttention = true

  } = options;



  const absInputPath = path.resolve(inputPath);

  const outputPath = absInputPath.replace(/\\.\\w+$/, '.json');



  // Build CLI command

  // Note: --flash-attn requires NVIDIA Ampere or newer

  const flashAttnFlag = useFlashAttention ? '--flash-attn' : '';

  const langFlag = language ? `--language ${language}` : '';

  

  const command = `insanely-fast-whisper \\

    --file-name "${absInputPath}" \\

    --model-name "openai/whisper-${model}" \\

    --batch-size ${batchSize} \\

    ${flashAttnFlag} \\

    ${langFlag} \\

    --transcript-path "${outputPath}"`;



  console.log('🎙️ Starting Transcription:', command);



  try {

    const { stdout, stderr } = await execAsync(command);

    console.log(stdout);

    if (stderr) console.error(stderr);



    // Read and parse the result

    const rawData = await fs.readFile(outputPath, 'utf-8');

    const json = JSON.parse(rawData);



    // Normalize output to Remotion-friendly format

    // insanely-fast-whisper usually outputs 'chunks', we flatten to words if available

    // Fallback logic depends on specific version output, assuming standard HF format here

    const words: WordTimestamp[] = [];

    

    if (json.chunks) {

      for (const chunk of json.chunks) {

        // If chunk has word timestamps

        if (chunk.timestamp \&\& Array.isArray(chunk.timestamp)) {

             // Logic to extract words if detailed timestamps exist

             // For now, mapping chunks as fallback if words missing

             words.push({

                 word: chunk.text,

                 start: chunk.timestamp[0],

                 end: chunk.timestamp[1]

             });

        }

      }

    }



    return words;



  } catch (error) {

    console.error('❌ Transcription failed:', error);

    throw error;

  }

}

