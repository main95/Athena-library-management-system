import { memo, ReactNode } from 'react'
import { Box, SxProps } from '@mui/material'
import { StyledRootScrollbar } from './styles'

type Props = {
  children: ReactNode,
  sx?: SxProps,
}

const Scrollbar: React.FC<Props> = ({ children, sx }) => {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }}>
        {children}
      </Box>
    )
  }

  return (
    <StyledRootScrollbar>
      {/* <StyledScrollbar clickOnTrack={false} sx={sx}>
        {children}
      </StyledScrollbar> */}
      <div>
        {children}
      </div>
    </StyledRootScrollbar>
  )
}

export default memo(Scrollbar)
