import https from 'https';
import sharp from 'sharp';

interface EventInput {
  imageUrl: string;
  width?: number;
  height?: number;
}

interface LambdaResponse {
  statusCode: number;
  headers: {
    'Content-Type': string;
  };
  body: string;
  isBase64Encoded: boolean;
}

export const handler = async (event: EventInput): Promise<LambdaResponse> => {
  try {

    console.log("Start: Hello from testing");
    console.log(event);
    console.log("End: Hello from testing");

    const { imageUrl, width = 300, height = 300 } = event;

    // Fetch the image from the provided URL
    const imageBuffer = await fetchImage(imageUrl);

    // Use sharp to resize the image
    const resizedImageBuffer = await sharp(imageBuffer)
      .resize(width, height)
      .toBuffer();

    // Encode the resized image as a base64 string to return in the response
    const base64Image = resizedImageBuffer.toString('base64');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/jpeg',
      },
      body: base64Image,
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Error processing image:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Failed to process image',
        error: error instanceof Error ? error.message : String(error),
      }),
      isBase64Encoded: false,
    };
  }
};

// Helper function to fetch image from a URL
const fetchImage = (url: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const data: Buffer[] = [];
      res.on('data', (chunk: Buffer) => {
        data.push(chunk);
      });
      res.on('end', () => {
        resolve(Buffer.concat(data));
      });
    }).on('error', (e: Error) => {
      reject(e);
    });
  });
};
