import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './nav'
import Header from './header'
import { styled } from '@mui/material'
import { StyledCommonPageWrapper } from '../../components/common/CommonComponents'

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100vh',
  overflow: 'hidden',
})

const DashboardLayout: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <StyledCommonPageWrapper>
        <Outlet />
      </StyledCommonPageWrapper>
    </StyledRoot>
  )
}

export default DashboardLayout
