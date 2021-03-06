//
import enzyme from 'enzyme'
import React from 'react'

import {mockModification} from '../../../utils/mock-data'
import EditAlignment from '../edit-alignment'

describe('Component > Modification > Edit Alignment', function () {
  it('renders correctly', function () {
    const props = {
      disabled: false,
      extendFromEnd: false,
      mapState: {
        modificationId: mockModification._id,
        state: null
      },
      modification: mockModification,
      allStops: [],
      numberOfStops: 16,
      segmentDistances: [45.22],
      setMapState: jest.fn(),
      update: jest.fn()
    }

    const tree = enzyme.shallow(<EditAlignment {...props} />)
    expect(tree).toMatchSnapshot()
    tree.unmount()
  })
})
