import { NavLink as RouterLink } from 'react-router-dom'
import { Box, List, ListItemText } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ListItemIcon, ListItemButton } from '@mui/material'
import { ReactNode } from 'react'

export const StyledNavItem: any = styled((props) =>
  <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}))

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const NavItem: React.FC<{
  item: { title: string, path: string, icon: ReactNode, info?: string }
}> = ({ item }) => {
  const { title, path, icon, info } = item

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  )
}

type Props = {
  data: { title: string, path: string, icon: ReactNode, info?: string }[]
}

const NavSection: React.FC<Props> = ({ data = [] }) => {
  return (
    <Box>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  )
}

export default NavSection
