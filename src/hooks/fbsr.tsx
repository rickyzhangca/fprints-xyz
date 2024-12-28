import { useMutation } from '@tanstack/react-query';

interface FBSRResponse {
  image: string; // base64 encoded webp image
}

const postFBSR = async (blueprint: string): Promise<FBSRResponse> => {
  const response = await fetch('https://fbsr.fprints.xyz/blueprint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      blueprint,
      'show-info-panels': false,
      'return-single-image': true,
      'max-width': 10000,
      'max-height': 10000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Server response:', errorText);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Get the binary data as a blob
  const blob = await response.blob();

  // Convert blob to base64
  const base64 = await new Promise<string>(resolve => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };
    reader.readAsDataURL(blob);
  });

  return { image: base64 };
};

export function usePostFBSR() {
  return useMutation({
    mutationFn: postFBSR,
    onError: error => {
      console.error('FBSR error:', error);
    },
  });
}
