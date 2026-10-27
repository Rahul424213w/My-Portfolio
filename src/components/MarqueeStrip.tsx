import { Fragment } from 'react';
import { marqueeItems } from '../data/marquee';

export default function MarqueeStrip() {
  const sequence = [...marqueeItems, ...marqueeItems];

  return (
    <div className="marquee-strip">
      <div className="marquee-inner">
        {sequence.map((item, index) => (
          <Fragment key={`${item}-${index}`}>
            <span>{item}</span>
            <span className="sep">✦</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
