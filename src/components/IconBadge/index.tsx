import React from 'react';
import { CBadge } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { stringEllipsis } from 'src/helpers';

interface IconBadgeProps extends CIcon {
  badgeLabel?: string;
  badgeColor?: string;
}

const IconBadge = (props: IconBadgeProps) => {
  const { badgeLabel, badgeColor = 'light', name, className, size } = props;
  const iconProps = { name, className, size };

  return (
    <span className={`${badgeLabel ? 'mr-3' : ''}`} style={{ position: 'relative' }}>
      <CIcon {...iconProps} />
      {!!badgeLabel && (
        <CBadge
          shape="pill"
          color={badgeColor}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginLeft: '0',
            marginTop: '-16px',
          }}>
          {stringEllipsis(badgeLabel, 3)}
        </CBadge>
      )}
    </span>
  );
};

export default React.memo(IconBadge);
