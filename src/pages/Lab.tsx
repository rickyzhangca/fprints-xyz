import { Button, Input } from '@/ui';
import { BlueprintUtils } from '@/utils';
import { IBlueprintWrapper } from '@/utils/blueprint/types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Lab = () => {
  const [string, setString] = useState('');
  const [deflated, setDeflated] = useState<any>();
  const [blueprint, setBlueprint] = useState<IBlueprintWrapper>();

  return (
    <div className="flex flex-col gap-8 p-6 text-steel-50">
      <Link to="/">
        <Button variant="secondary">Back to homepage</Button>
      </Link>
      <div className="flex items-center gap-4">
        <p>Blueprint string</p>
        <Input
          containerClassName="flex-1"
          value={string}
          onChange={e => setString(e.target.value)}
        />
        <Button
          onClick={() => {
            setDeflated(undefined);
            setBlueprint(undefined);
            const json = BlueprintUtils.Conversion.decodeBase64String(string);
            setDeflated(json);
            setBlueprint(BlueprintUtils.Analysis.validateJson(json).data);
          }}
        >
          Process
        </Button>
      </div>
      <div className="relative flex items-center gap-4">
        <p>JSON</p>
        <pre className="max-h-[500px] flex-1 overflow-y-auto whitespace-pre-wrap rounded-lg bg-steel-900 p-4 font-mono text-sm">
          {JSON.stringify(deflated, null, 2) || 'No JSON yet'}
        </pre>
        {deflated && (
          <Button
            className="absolute bottom-4 right-8"
            onClick={() =>
              navigator.clipboard.writeText(JSON.stringify(deflated))
            }
          >
            Copy
          </Button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <p>Validated</p>
        <pre className="max-h-[500px] flex-1 overflow-y-auto whitespace-pre-wrap rounded-lg bg-steel-900 p-4 font-mono text-sm">
          {typeof blueprint === 'string'
            ? blueprint
            : JSON.stringify(blueprint, null, 2) || 'No blueprint yet'}
        </pre>
      </div>
    </div>
  );
};
