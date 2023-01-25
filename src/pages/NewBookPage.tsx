import {
  Button,
  Container,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { StyledCommonPageWrapper } from '../components/common/CommonComponents'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Book } from '../types/Books'

type IFormInput = Omit<Book, 'id'>

const NewBookPage: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = data => console.log(data)

  return (
    <StyledCommonPageWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container disableGutters={false}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              New Book Form
            </Typography>
            <Button type="submit">
              create
            </Button>
          </Stack>
        </Container>

        <div>
          <TextField placeholder="title" {...register('title', { required: true })} />
          {errors.title && <span>This field is required</span>}
          <TextField placeholder="author name" {...register('authorName')} />
          <TextField placeholder="author surname" {...register('authorSurname')} />
          <Select
            labelId="status"
            id="status"
            label="status"
            {...register('status')}
          >
            <MenuItem value={'in'}>Availbale</MenuItem>
            <MenuItem value={'out'}>Not available</MenuItem>
          </Select>
          <Select
            labelId="type"
            id="type"
            label="type"
            {...register('type')}
          >
            <MenuItem value={'fiction'}>Fiction</MenuItem>
            <MenuItem value={'nonFiction'}>Non fiction</MenuItem>
          </Select>
        </div>
      </form>
    </StyledCommonPageWrapper>
  )
}

export default NewBookPage
