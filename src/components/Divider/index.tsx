import React from 'react';

interface DividerProps {
  vertical?: boolean;
}

const verticalCss = {
  marginLeft: '1px',
  marginRight: '1px',
  width: '1px',
  backgroundColor: 'rgba(0, 0, 21, 0.2)',
};

const Divider = (props: DividerProps) => {
  const { vertical } = props;
  const styles = {};
  if (vertical) {
    Object.assign(styles, verticalCss);
  }

  return <div style={vertical ? verticalCss : {}}></div>;
};

export default React.memo(Divider);
