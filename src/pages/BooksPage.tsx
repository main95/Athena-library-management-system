import { Label } from '@mui/icons-material'
import {
  Box,
  Card,
  Checkbox,
  Chip,
  Container,
  IconButton,
  MenuItem,
  Paper,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import Iconify from '../components/iconify'
import Scrollbar from '../components/scrollbar'
import { Book, BooksTableHeader } from '../types/Books'
import { sentenceCase } from 'change-case'
import { filter } from 'lodash'
import { UserListToolbar } from '../components/user-list-toolbar'
import { useDispatch, useSelector } from 'react-redux'
import booksActions from '../features/book/actions'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../app/store'
import { Action } from 'redux'
import { selectBooks } from '../features/book/selectors'
import { StyledCommonPageWrapper } from '../components/common/CommonComponents'
import { Link } from 'react-router-dom'

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
}

const TABLE_HEAD: BooksTableHeader[] = [
  { _id: 'title', label: 'Title', alignRight: false },
  { _id: 'authorSurname', label: 'Author', alignRight: false },
  { _id: 'type', label: 'Type', alignRight: false },
  { _id: 'status', label: 'Status', alignRight: false },
  { _id: 'status', label: 'Status', alignRight: false },
  { _id: '' },
]

function descendingComparator(a: Book, b: Book, orderBy: keyof Book | '') {
  if (orderBy && b[orderBy] < a[orderBy]) {
    return -1
  }
  if (orderBy && b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order: string, orderBy: keyof Book | '') {
  return order === 'desc'
    ? (a: Book, b: Book) => descendingComparator(a, b, orderBy)
    : (a: Book, b: Book) => -descendingComparator(a, b, orderBy)
}

function applySortFilter(array: Book[], comparator: (value1: Book, value2: Book) => number, query: string) {
  const stabilizedThis: { item: Book, index: number }[] = array.map((el, index) => {
    return { item: el, index: index }
  })
  stabilizedThis.sort((a, b) => {
    const order: number = comparator(a.item, b.item)
    if (order !== 0) return order
    return a.index - b.index
  })
  if (query) {
    return filter(array, (book: Book) => book.title.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }
  return stabilizedThis.map((el) => el.item)
}

const BooksPage: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, unknown, Action<string>> = useDispatch()
  const [open, setOpen] = useState<Element | null>(null)
  const [page, setPage] = useState<number>(0)
  const [selected, setSelected] = useState<string[]>([])
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = useState<keyof Book | ''>('')
  const [filterName, setFilterName] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const books = useSelector(selectBooks)

  const numSelected = selected.length
  const rowCount = books.length

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = books.map((n) => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleRequestSort = (event: React.MouseEvent<Element>, property: keyof Book | '') => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const createSortHandler = (property: keyof Book | '') => (event: React.MouseEvent<Element>) => {
    handleRequestSort(event, property)
  }

  const handleClick = (event: React.ChangeEvent<Element>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: string[] = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    setSelected(newSelected)
  }

  const handleOpenMenu = (event: React.MouseEvent<Element>) => {
    setOpen(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpen(null)
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0)
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0)
    setFilterName(event.target.value)
  }

  useEffect(() => {
    dispatch(booksActions.getBooksAction())
  }, [dispatch])

  const filteredBooks: Book[] = applySortFilter(books, getComparator(order, orderBy), filterName)
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - books.length) : 0
  const isNotFound = !filteredBooks.length && !!filterName

  console.log('emptyRows: ', emptyRows)

  return (
    <StyledCommonPageWrapper>
      <Container disableGutters={false}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Books
          </Typography>
          <Link to={'new-book'}>
            New book
          </Link>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    {TABLE_HEAD.map((headCell: BooksTableHeader, index: number) => (
                      <TableCell
                        key={headCell._id + index}
                        align={headCell.alignRight ? 'right' : 'left'}
                        sortDirection={orderBy === headCell._id ? order : false}
                      >
                        <TableSortLabel
                          hideSortIcon
                          active={orderBy === headCell._id}
                          direction={orderBy === headCell._id ? order : 'asc'}
                          onClick={createSortHandler(headCell._id)}
                        >
                          {headCell.label}
                          {orderBy === headCell._id ? (
                            <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
                          ) : null}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((book) => {
                    const { id, title, type, status, authorName, authorSurname } = book
                    const selectedUser = selected.indexOf(id) !== -1

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, id)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {title}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{`${authorName} ${authorSurname}`}</TableCell>

                        <TableCell align="left">{type}</TableCell>

                        <TableCell align="left">
                          <Chip
                            label={status === 'in' ? 'Available' : 'Not available'}
                            color={status === 'in' ? 'success' : 'error'}
                          />
                        </TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'out' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp
                            <strong>&quot{filterName}&quot</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={books.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </StyledCommonPageWrapper>
  )
}

export default BooksPage
