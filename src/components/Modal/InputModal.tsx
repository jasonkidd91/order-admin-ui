import React from 'react';
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormText,
  CInput,
} from '@coreui/react';

export interface InputModalProps {
  title?: string;
  value?: string;
  maxLength?: number;
  placeholder?: string;
  hint?: string;
  show?: boolean;
  closeHandler?: Function;
  submitHandler?: Function;
  size?: 'sm' | 'lg' | 'xl';
  closeOnBackdrop?: boolean;
}

export const useInputModal = (props?: InputModalProps) => {
  const [state, setState] = React.useState<InputModalProps>(props || {});

  const openModal = React.useCallback(
    (inputState: InputModalProps) => setState({ ...state, ...inputState }),
    [state],
  );

  const closeModal = React.useCallback(() => setState({ ...state, show: false }), [state]);

  const values = React.useMemo(
    () => ({
      state,
      openModal,
      closeModal,
    }),
    [state, openModal, closeModal],
  );

  return values;
};

const InputModal = (props: InputModalProps) => {
  const [inputValue, setInputValue] = React.useState('');
  const {
    title = 'Input',
    value = '',
    maxLength,
    placeholder = 'enter your message',
    hint = '',
    show = false,
    closeHandler = () => {},
    submitHandler = () => {},
    size = 'lg',
    closeOnBackdrop = false,
  } = props;

  React.useEffect(() => {
    setInputValue(value);
  }, [props]);

  return (
    <CModal
      show={show}
      onClose={closeHandler}
      size={size}
      centered={true}
      closeOnBackdrop={closeOnBackdrop}>
      <CModalHeader closeButton>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CInput
          type="text"
          value={inputValue}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={(ev: any) => setInputValue(ev.target.value)}
        />
        <div>
          {!!hint && <CFormText className="help-block">{hint}</CFormText>}
          {maxLength && (
            <small className="float-right">
              {inputValue.length}/{maxLength}
            </small>
          )}
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="success" onClick={() => submitHandler(inputValue)}>
          Submit
        </CButton>{' '}
        <CButton color="secondary" onClick={closeHandler}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default React.memo(InputModal);

/**
 * **************************************
 * Use Case:
 * **************************************
 * import InputModal, { useInputModal } from 'src/components/Modal/InputModal';
 *
 * ...
 * const { state, openModal, closeModal, } = useInputModal();
 *
 * const triggerFunction = () => {
 *    openModal({
 *      show: true,
 *      title: 'Modal Title',
 *      value: 'Modal Value',
 *      maxLength: 50,
 *      placeholder: 'Modal Placeholder',
 *      hint: 'Modal Hint',
 *      size: 'lg',
 *      closeOnBackdrop: false,
 *      closeHandler: closeModal,
 *      submitHandler: (value: any) => {
 *          doSomething(...);
 *          closeModal();
 *      },
 *    });
 * };
 *
 * <InputModal {...state} />
 * ...
 */
