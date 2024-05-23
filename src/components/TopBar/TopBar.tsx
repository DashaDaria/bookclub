import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export const TopBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <AutoStoriesIcon />
                </Toolbar>
            </AppBar>
        </Box>
    );
}