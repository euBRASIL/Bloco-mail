import styled, { keyframes } from "styled-components";

export const flex = `display: flex;`;
export const flexAlign = `${flex}; align-items: center;`;
export const flexAlignRight = `${flex}; align-items: center; justify-content: end;`;
export const flexBetween = `${flexAlign};justify-content: space-between;`;
export const flexJustBetween = `${flex}; justify-content: space-between;`;

export const FlexWrapper = styled.div`
  ${flex}
`;
export const FlexAlignWrapper = styled.div`
  ${flexAlign}
`;

export const FlexAlignRightWrapper = styled.div`
  ${flexAlignRight}
  align-items: flex-end;
`;

export const FlexBetweenWrapper = styled.div`
  ${flexBetween}
`;

export const FlexJustBetweenWrapper = styled.div`
  ${flexJustBetween}
`;
