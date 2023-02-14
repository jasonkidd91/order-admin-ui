import React from 'react';
import { CInput, CInputGroup, CInputGroupPrepend, CInputGroupAppend, CButton } from '@coreui/react';
import './styles.scss';
import CIcon from '@coreui/icons-react';

export interface AutocompleteProps extends Omit<React.HTMLProps<HTMLInputElement>, 'size'> {
  iconPrepend?: string;
  iconAppend?: string;
  appendHandler?: Function;
  suggestions?: any[];
  shouldRender?: Boolean;
  renderItem?: Function;
}

const Autocomplete = (props: AutocompleteProps) => {
  const [onFocus, setOnFocus] = React.useState(false);
  const {
    iconPrepend,
    iconAppend,
    appendHandler,
    suggestions = [],
    renderItem = () => {},
    shouldRender = true,
    value,
    type,
    placeholder,
    onChange,
  } = props;
  const inputProps = { value, type, placeholder, onChange };

  const InputPrepend = () => (
    <CInputGroupPrepend>
      <CButton size="sm" variant="outline" color="secondary" className="text-dark bg-white">
        <CIcon name={iconPrepend} />
      </CButton>
    </CInputGroupPrepend>
  );

  const InputAppend = () => (
    <CInputGroupAppend>
      <CButton
        size="sm"
        variant="outline"
        color="secondary"
        className="text-dark bg-white"
        onClick={appendHandler}>
        <CIcon name={iconAppend} />
      </CButton>
    </CInputGroupAppend>
  );

  return (
    <React.Fragment>
      <div className="autocomplete-container">
        <CInputGroup>
          {iconPrepend && <InputPrepend />}
          <CInput
            {...inputProps}
            onFocus={() => setOnFocus(true)}
            onBlur={() => setOnFocus(false)}
          />
          {iconAppend && <InputAppend />}
        </CInputGroup>
        {onFocus && shouldRender && (
          <div className="suggestions">
            {suggestions.length > 0 ? (
              suggestions.map((val: any, idx: number) => (
                <div tabIndex={idx} key={idx} onMouseDown={(ev: any) => ev.preventDefault()}>
                  {renderItem(val, idx)}
                </div>
              ))
            ) : (
              <div className="disabled">
                <em>No Result</em>
              </div>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default React.memo(Autocomplete);

/**
 * **************************************
 * Use Case:
 * **************************************
 * import Autocomplete from 'src/components/Autocomplete';
 *
 * ...
 * const isLoading = false;
 * const suggestionList = ['itemA', 'itemB'];
 *
 * <Autocomplete
 *   type="search"
 *   placeholder="autocomplete placeholder"
 *   iconPrepend="cil-user"
 *   onChange={() => { ... do something ... }}
 *   suggestions={suggestionList}
 *   shouldRender={!isLoading}
 *   renderItem={(suggestionItem: any, index: number) => (
 *       <div key={index} onClick={() => { ... do something ... }}>
 *       {suggestionItem}
 *       <span className="float-right">{suggestionItem}</span>
 *       </div>
 *   )}
 *  />
 * ...
 */
