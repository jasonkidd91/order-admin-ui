const mockListing = {
  records: [
    {
      id: 1,
      delivery_date: '2021-07-26T13:24:10.000Z',
      created_date: '2021-11-18T07:11:59.000Z',
      updated_date: null,
      created_by: 2,
      updated_by: null,
      remark: 'Some Remark',
      is_del: 0,
      export_count: 0,
      created_user: {
        id: 2,
        name: 'Charles',
        action_date: '2021-11-18T07:11:59.000Z',
      },
      updated_user: {
        id: null,
        action_date: null,
      },
    },
    {
      id: 2,
      delivery_date: '2021-10-26T13:24:10.000Z',
      created_date: '2021-11-18T07:11:59.000Z',
      updated_date: null,
      created_by: 2,
      updated_by: null,
      remark: null,
      is_del: 0,
      export_count: 0,
      created_user: {
        id: 2,
        name: 'Charles',
        action_date: '2021-11-18T07:11:59.000Z',
      },
      updated_user: {
        id: null,
        action_date: null,
      },
    },
  ],
  paging: {
    records_total: 2,
    per_page: '20',
    current_page: '1',
    last_page: 1,
  },
};

export default mockListing;
