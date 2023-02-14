import React, { useRef } from 'react';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import './styles.scss';

interface OptionButtonProps {
  title?: string;
  menu: OptionsProps[];
}

interface OptionsProps {
  icon?: string;
  iconColor?: string;
  label: string;
  clickHandler: Function;
}

const OptionButton = (props: OptionButtonProps) => {
  const ref = useRef<any>();
  const { title, menu } = props;

  const clickListener = () => {
    // This returns an object with left, top, right, bottom, x, y, width, and height.
    // var rect = ref.current.getBoundingClientRect();
    // console.log(rect);
  };

  return (
    <>
      <span>
        <CDropdown className="c-header-nav-item">
          <CDropdownToggle
            onClick={clickListener}
            className="c-header-nav-link p-0"
            caret={false}
            variant="ghost"
            color="dark"
            size="sm">
            <CIcon name="cil-options" size="sm" />
          </CDropdownToggle>

          <div ref={ref} className="fixed-wrapper">
            <CDropdownMenu placement="bottom-end" className="pt-0">
              {!!title && (
                <CDropdownItem header tag="div" className="text-center" color="light">
                  <strong>{title}</strong>
                </CDropdownItem>
              )}

              {menu.map((m) => (
                <CDropdownItem key={m.label} onClick={m.clickHandler}>
                  {!!m.icon && <CIcon name={m.icon} className={`mr-2 ${m.iconColor}`} />} {m.label}
                </CDropdownItem>
              ))}
            </CDropdownMenu>
          </div>
        </CDropdown>
      </span>
    </>
  );
};

export default React.memo(OptionButton);

/**
 * **************************************
 * Use Case:
 * **************************************
 * import OptionButton from 'src/components/OptionButton';;
 *
 * ...
 *
 * <OptionButton
 *  title="Menu Options"
 *  menu={[
 *    {
 *      icon: 'cil-pencil',
 *      iconColor: 'text-primary',
 *      label: 'Edit',
 *      clickHandler: () => { ... do something ... },
 *    },
 *    {
 *      icon: 'cil-trash',
 *      iconColor: 'text-danger',
 *      label: 'Delete',
 *      clickHandler: () => { ... do something ... },
 *    },
 *  ]}
 * />
 * ...
 */
