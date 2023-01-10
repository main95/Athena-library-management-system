import { forwardRef } from 'react'
import { Icon } from '@iconify/react'
import { Box, SxProps } from '@mui/material'

type Props = {
  icon: string,
  width?: number | undefined,
  sx?: SxProps
}

const Iconify = forwardRef(({ icon, width = 20, sx }: Props, ref) => (
  <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} />
))

export default Iconify
