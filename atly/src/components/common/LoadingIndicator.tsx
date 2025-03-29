import React from 'react';
import styled, { keyframes } from 'styled-components';

type SpinnerSize = 'small' | 'medium' | 'large';

const sizeMap: Record<SpinnerSize, number> = {
    small: 10,
    medium: 20,
    large: 30,
};

const defaultSize: SpinnerSize = 'medium';

// Define the keyframes for the spinner animation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div<{ size?: SpinnerSize }>`
  width: ${props => sizeMap[props.size || defaultSize]}px;
  height: ${props => sizeMap[props.size || defaultSize]}px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

interface LoadingIndicatorProps {
  size?: SpinnerSize; // Optional prop to customize the size of the spinner
}

/**
 * Component to display a loading spinner.
 * @param size - Optional prop to customize the size of the spinner
 * @returns 
 */
const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({size}) => {
  return (
    <SpinnerWrapper>
      <Spinner size={size} />
    </SpinnerWrapper>
  );
};

export default LoadingIndicator;
