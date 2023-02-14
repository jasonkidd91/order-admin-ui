import { CCol, CContainer, CFormGroup, CInput, CLabel, CTextarea } from '@coreui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from 'src/redux/types';
import { setProfileDetailFormState } from '../redux/menuMaintenanceSlice';
import { ProfileDetailFormState } from '../redux/types';

const ProfileForm = () => {
  const dispatch = useDispatch<RootDispatch>();
  const [menuMaintState] = useSelector((state: RootState) => [state.menuMaintenance] as const);

  const { profileDetailFormState } = menuMaintState;

  const [formState, setFormState] = React.useState<ProfileDetailFormState>({});

  React.useEffect(() => {
    if (profileDetailFormState) {
      setFormState({ ...profileDetailFormState });
    }
  }, [profileDetailFormState]);

  const onFormStateChange = (event: any) => {
    const { name, value } = event.target;

    dispatch(
      setProfileDetailFormState({
        ...formState,
        [name]: value,
      } as ProfileDetailFormState),
    );
  };

  return (
    <CContainer className="px-0">
      <CFormGroup row>
        <CCol xs="12" md="6" className="py-2">
          <CLabel htmlFor="name">Name</CLabel>
          <CInput
            id="name"
            name="name"
            value={profileDetailFormState?.name}
            onChange={onFormStateChange}
          />
        </CCol>
        <CCol xs="12" md="6" className="py-2">
          <CLabel htmlFor="email">Email</CLabel>
          <CInput id="email" name="email" value={formState?.email} onChange={onFormStateChange} />
        </CCol>
        <CCol xs="12" md="6" className="py-2">
          <CLabel htmlFor="remarks">Remarks</CLabel>
          <CInput
            id="remarks"
            name="remarks"
            value={formState?.remarks}
            onChange={onFormStateChange}
          />
        </CCol>
        <CCol xs="12" md="6" className="py-2">
          <CLabel htmlFor="minimumAmount">Minimum Amount</CLabel>
          <CInput
            id="minimumAmount"
            name="minimumAmount"
            type="number"
            value={formState?.minimumAmount}
            onChange={onFormStateChange}
          />
        </CCol>
        <CCol xs="12" className="py-2">
          <CLabel htmlFor="logoUrl">Logo Url</CLabel>
          <CInput
            id="logoUrl"
            name="logoUrl"
            value={formState?.logoUrl}
            onChange={onFormStateChange}
          />
        </CCol>
      </CFormGroup>

      <CFormGroup row>
        <CCol xs="12" className="py-2">
          <CLabel htmlFor="tnc">Terms and Conditions</CLabel>
          <CTextarea id="tnc" name="tnc" value={formState?.tnc} onChange={onFormStateChange} />
        </CCol>
        <CCol xs="12" className="py-2">
          <CLabel htmlFor="privacyPolicy">Privacy Policy</CLabel>
          <CTextarea
            id="privacyPolicy"
            name="privacyPolicy"
            value={formState?.privacyPolicy}
            onChange={onFormStateChange}
          />
        </CCol>
      </CFormGroup>
    </CContainer>
  );
};

export default React.memo(ProfileForm);
