import styled from '@emotion/styled';
import { topStyle } from './styles';
import { colors } from '../../constants/colors';

const Top16 = styled.h3`
  ${topStyle}
  font-weight: normal;
  color: ${colors.grey700}
  padding-top: 12px;
  font-size: 16px;
  line-height: 24px;
  word-break: keep-all;
`;

export default Top16;
