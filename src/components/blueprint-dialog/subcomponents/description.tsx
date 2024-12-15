import { lazy, Suspense } from 'react';

const MarkdownPreview = lazy(() =>
  import('@uiw/react-md-editor').then(mdx => ({
    default: mdx.default.Markdown,
  }))
);

export const Description = ({ description }: { description: string }) => {
  return (
    <Suspense fallback={<div>Loading description...</div>}>
      <section aria-label="Blueprint description">
        <MarkdownPreview
          source={description}
          style={
            {
              '--color-border-muted': '#474747',
              '--color-border-default': '#333',
              '--color-canvas-default': '#313031',
              '--color-fg-default': '#e7e6e7',
            } as React.CSSProperties
          }
          wrapperElement={{
            'data-color-mode': 'dark',
          }}
        />
      </section>
    </Suspense>
  );
};
