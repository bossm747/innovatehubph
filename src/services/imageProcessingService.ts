import { supabase } from '@/integrations/supabase/client';

// Available image processing operations
export type ImageProcessingOperation = 
  | 'generate' 
  | 'enhance' 
  | 'background-removal' 
  | 'resize';

export interface ProcessImageOptions {
  operation: ImageProcessingOperation;
  prompt?: string;
  provider?: 'openai' | 'replicate' | 'huggingface';
  image?: File;
  size?: string;
  projectId?: string;
}

/**
 * Process an image or generate a new one using AI
 */
export const processImage = async (options: ProcessImageOptions): Promise<string> => {
  try {
    const { operation, prompt, provider = 'openai', image, size = '1024x1024', projectId } = options;
    
    let result: string = '';
    
    // Call the appropriate edge function based on the operation
    if (operation === 'generate') {
      // Call image generation function
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt, provider, size }
      });
      
      if (error) throw error;
      result = data.image;
      
      // Store the result in Supabase if it's successful
      if (result && prompt) {
        await storeGeneratedFile({
          content: result,
          filename: `${prompt.slice(0, 30).replace(/[^a-z0-9]/gi, '_')}.png`,
          type: 'image',
          prompt,
          provider,
          projectId
        });
      }
    } else if (operation === 'background-removal' && image) {
      // Process the image client-side using Hugging Face transformers
      result = await removeImageBackground(image);
    } else if (operation === 'enhance' && image) {
      // For enhancement, we'll redirect to the edge function
      const formData = new FormData();
      formData.append('image', image);
      
      const { data, error } = await supabase.functions.invoke('enhance-image', {
        body: { image: await convertFileToBase64(image) }
      });
      
      if (error) throw error;
      result = data.image;
    }
    
    return result;
  } catch (error) {
    console.error('Error in processImage:', error);
    throw error;
  }
};

/**
 * Convert a File object to a base64 string
 */
export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Store a generated file in Supabase
 */
export const storeGeneratedFile = async (params: {
  content: string;
  filename: string;
  type: 'image' | 'text';
  prompt?: string;
  provider?: string;
  projectId?: string;
}): Promise<{ id: string, url: string } | null> => {
  try {
    const { content, filename, type, prompt, provider, projectId } = params;
    
    // Convert base64 to blob for storage
    const base64Data = content.split(',')[1];
    const blob = base64ToBlob(base64Data, type === 'image' ? 'image/png' : 'text/plain');
    
    // Generate a unique storage path
    const timestamp = Date.now();
    const storagePath = `${type}s/${timestamp}_${filename}`;
    
    // Upload file to storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from('ai-generated')
      .upload(storagePath, blob, {
        contentType: type === 'image' ? 'image/png' : 'text/plain',
        upsert: true
      });
      
    if (storageError) throw storageError;
    
    // Store metadata in database
    const { data: dbData, error: dbError } = await supabase
      .from('ai_generated_files')
      .insert([{
        filename,
        type,
        storage_path: storagePath,
        prompt,
        provider,
        project_id: projectId
      }])
      .select('id')
      .single();
      
    if (dbError) throw dbError;
    
    // Get the URL for the uploaded file
    const { data: urlData } = await supabase.storage
      .from('ai-generated')
      .getPublicUrl(storagePath);
      
    return { id: dbData.id, url: urlData.publicUrl };
  } catch (error) {
    console.error('Error storing generated file:', error);
    return null;
  }
};

/**
 * Convert a base64 string to a Blob
 */
const base64ToBlob = (base64: string, contentType: string): Blob => {
  const byteCharacters = atob(base64);
  const byteArrays = [];
  
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  
  return new Blob(byteArrays, { type: contentType });
};

/**
 * Remove background from an image using the HuggingFace model
 */
export const removeImageBackground = async (imageFile: File): Promise<string> => {
  try {
    const img = await loadImage(imageFile);
    const { pipeline, env } = await import('@huggingface/transformers');
    
    // Configure transformers.js
    env.allowLocalModels = false;
    env.useBrowserCache = false;
    
    const segmenter = await pipeline('image-segmentation', 'Xenova/segformer-b0-finetuned-ade-512-512');
    
    // Convert image to canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');
    
    // Resize image if needed
    const maxDimension = 1024;
    let width = img.naturalWidth;
    let height = img.naturalHeight;
    
    if (width > maxDimension || height > maxDimension) {
      if (width > height) {
        height = Math.round((height * maxDimension) / width);
        width = maxDimension;
      } else {
        width = Math.round((width * maxDimension) / height);
        height = maxDimension;
      }
    }
    
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    
    // Get image data as base64
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    
    // Process the image
    const result = await segmenter(imageData);
    
    // Create a new canvas for the masked image
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = width;
    outputCanvas.height = height;
    const outputCtx = outputCanvas.getContext('2d');
    
    if (!outputCtx) throw new Error('Could not get output canvas context');
    
    // Draw original image
    outputCtx.drawImage(canvas, 0, 0);
    
    // Apply the mask
    const outputImageData = outputCtx.getImageData(0, 0, width, height);
    const data = outputImageData.data;
    
    // Apply inverted mask to alpha channel (to keep the subject, not the background)
    for (let i = 0; i < result[0].mask.data.length; i++) {
      // Invert the mask value to keep the subject instead of the background
      const alpha = Math.round((1 - result[0].mask.data[i]) * 255);
      data[i * 4 + 3] = alpha;
    }
    
    outputCtx.putImageData(outputImageData, 0, 0);
    
    // Convert to base64
    return outputCanvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error removing background:', error);
    throw error;
  }
};

/**
 * Load an image file and return an HTMLImageElement
 */
export const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

export const getPretrainedModelOptions = (modelType: string) => {
  switch (modelType) {
    case 'image-to-image':
      return {
        model: 'stabilityai/stable-diffusion-2-1',
        input: {
          prompt: '',
          image: '',
          strength: 0.7,
          guidance_scale: 7.5,
          negative_prompt: ''
        }
      };
    case 'text-to-image':
      return {
        model: 'stabilityai/stable-diffusion-xl-base-1.0',
        input: {
          prompt: '',
          width: 1024,
          height: 1024,
          guidance_scale: 7.5,
          negative_prompt: ''
        }
      };
    case 'upscale':
      return {
        model: 'nightmareai/real-esrgan',
        input: {
          image: '',
          scale: 2,
          face_enhance: false
        }
      };
    default:
      return {
        model: 'stabilityai/stable-diffusion-xl-base-1.0',
        input: {
          prompt: '',
          width: 1024,
          height: 1024
        }
      };
  }
};
