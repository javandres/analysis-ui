/* global describe, it, expect */

import React from 'react'
import renderer from 'react-test-renderer'

import { mockFeed, mockModification } from '../test-utils/mock-data'

describe('Report > AdjustFrequency', () => {
  const AdjustFrequency = require('../../lib/report/adjust-frequency')

  it('renders correctly', () => {
    const props = {
      feedsById: { '1': mockFeed },
      modification: mockModification
    }

    // mount component
    const tree = renderer.create(
      <AdjustFrequency
        {...props}
        />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
