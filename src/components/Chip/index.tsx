import React from 'react';
import { CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';

interface ChipProps extends CButton {
  label?: string;
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
  shape?: 'pill' | 'square' | 'rounded';
  closeHandler?: Function;
}

const Chip = (props: ChipProps) => {
  const {
    label,
    icon,
    closeHandler,
    shape = 'pill',
    color = 'light',
    size = 'sm',
    onClick,
    className,
  } = props;
  const buttonProps = { shape, color, size, onClick, className };

  const closeColor = ['light', 'secondary', 'warning'].includes(color) ? 'text-dark' : 'text-light';

  const onClose = (ev: any) => {
    ev.preventDefault();
    if (closeHandler) {
      closeHandler();
    }
  };

  return (
    <span>
      <CButton {...buttonProps}>
        {icon && <CIcon name={icon} className="mx-1" />}
        <span className={`${!icon ? 'ml-1' : ''} mr-1`}>{label}</span>
        {closeHandler && (
          <CIcon name="cil-x-circle" className={`${closeColor}`} onClick={onClose} />
        )}
      </CButton>
    </span>
  );
};

export default React.memo(Chip);
