import { TextField, Button, Container } from '@mui/material';
import './App.css';

export const App = () => {
    return (
        <Container maxWidth="sm">
            <div className='form'>
                <TextField id="outlined-basic" label="Category" variant="outlined" />
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                <Button variant="contained">Submit</Button>
            </div>
        </Container>
    )
}

