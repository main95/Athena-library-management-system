import { ReactNode } from 'react'
import InboxIcon from '@mui/icons-material/Inbox'

const navConfig: { title: string, path: string, icon: ReactNode, info?: string }[] = [
  {
    title: 'Books',
    path: '/dashboard/books',
    icon: <InboxIcon />,
  },
  {
    title: 'Authors',
    path: '/dashboard/authors',
    icon: <InboxIcon />,
  },
  {
    title: 'Users',
    path: '/dashboard/users',
    icon: <InboxIcon />,
  },
  {
    title: 'Login',
    path: '/login',
    icon: <InboxIcon />,
  },
  {
    title: 'Not found',
    path: '/404',
    icon: <InboxIcon />,
  },
]

export default navConfig
