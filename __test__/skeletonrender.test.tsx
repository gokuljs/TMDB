import React from 'react';
import { render } from '@testing-library/react';
import SkeletonLoader from '../app/(main)/_components/Skeleton'; // Adjust the import path as necessary

describe('SkeletonLoader', () => {
  it('renders the correct number of Skeleton components', () => {
    const { getAllByTestId } = render(<SkeletonLoader />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const skeletonElements = getAllByTestId('skeleton');
    expect(skeletonElements.length).toBe(100);
  });
});
