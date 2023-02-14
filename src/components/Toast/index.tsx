import React from 'react';
import { CToaster, CToast, CToastHeader, CToastBody } from '@coreui/react';

class Toast extends React.Component {
  Container(props: any) {
    const { position = 'bottom-right', children } = props;
    return <CToaster position={position}>{children}</CToaster>;
  }

  Item(props: any) {
    const {
      show = true,
      autohide = 3000,
      fade = true,
      closeButton = true,
      title = 'Toast Title',
      message = 'Toast Message',
      color,
    } = props;
    return (
      <CToast show={show} autohide={autohide} fade={fade} color={color}>
        <CToastHeader closeButton={closeButton}>{title}</CToastHeader>
        <CToastBody>{message}</CToastBody>
      </CToast>
    );
  }
}

const useToast = (props?: any) => new Toast(props);

export default useToast;
