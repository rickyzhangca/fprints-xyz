import { Button, type ButtonProps } from '@/ui';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';

type CopyButtonProps = {
  content: string;
  hideText?: boolean;
  variant?: ButtonProps['variant'];
  onCopy?: () => void;
  umamiEvent: string;
  className?: string;
};

export const CopyButton = ({
  content,
  onCopy,
  variant,
  hideText,
  umamiEvent,
  className,
}: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      navigator.clipboard.writeText(content);
      onCopy?.();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <Button
      data-umami-event={umamiEvent}
      variant={variant}
      className={className}
      onClick={handleCopy}
    >
      {hideText ? (
        copied ? (
          <CheckIcon
            className="size-4 shrink-0"
            absoluteStrokeWidth
            strokeWidth={2.5}
          />
        ) : (
          <CopyIcon
            className="size-4 shrink-0"
            absoluteStrokeWidth
            strokeWidth={2.5}
          />
        )
      ) : (
        <>
          {copied ? (
            <>
              <CheckIcon
                className="mr-2 inline-block size-4 shrink-0"
                strokeWidth={2.5}
              />
              {!hideText && 'Copied!'}
            </>
          ) : (
            <>
              <CopyIcon
                className="mr-2 inline-block size-4 shrink-0"
                absoluteStrokeWidth
                strokeWidth={2.5}
              />
              <span className="hidden md:inline">
                {!hideText && 'Copy to clipboard'}
              </span>
              <span className="inline md:hidden">{!hideText && 'Copy'}</span>
            </>
          )}
        </>
      )}
    </Button>
  );
};
