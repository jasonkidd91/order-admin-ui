import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { CCard, CCardBody, CCardFooter, CCol, CRow } from '@coreui/react';
import { getMockData, getReduxData } from '../redux/dashboardSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { mockData, reduxData } = useSelector((state: any) => {
    return {
      mockData: state.dashboard.mockPayload,
      reduxData: state.dashboard.reduxPayload,
    };
  });

  useEffect(() => {
    dispatch(getMockData());
    dispatch(getReduxData());
  }, []);

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="12">
              <h4 id="traffic" className="card-title mb-0">
                What is Lorem Ipsum?
              </h4>
              <div className="small text-muted">June 2021</div>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow className="text-justify py-3">
            <CCol sm="12">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </CCol>
          </CRow>
          <CRow className="text-justify py-3">
            <CCol sm="12">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </CCol>
          </CRow>
          <CRow className="text-justify py-3">
            <CCol sm="12">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="12">
              <h4 id="traffic" className="card-title mb-0">
                Mock Data
              </h4>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow className="text-justify">
            <CCol sm="12">{JSON.stringify(mockData)}</CCol>
          </CRow>
        </CCardFooter>
      </CCard>

      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="12">
              <h4 id="traffic" className="card-title mb-0">
                Redux Data
              </h4>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow className="text-justify">
            <CCol sm="12">{JSON.stringify(reduxData)}</CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  );
};

export default Dashboard;
