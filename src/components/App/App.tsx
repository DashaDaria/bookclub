import { useEffect, useState } from 'react';
import { TextField, Button, Container, Alert, Typography } from '@mui/material';
import './App.css';
import { TopBar } from '../TopBar';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

// Define the type for genre objects
interface DataType {
    name: string;
}


const fetchGenre = async (collectionName: string) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const newData = querySnapshot.docs.map(doc => ({ ...doc.data() }) as DataType);
        return newData;
    } catch (error) {
        console.error('Error fetching genres:', error);
        return [];
    }
};

export const App = () => {
    const [genre, setGenre] = useState("")
    const [nuance, setNuance] = useState("")
    const [random, setRandom] = useState("")

    const [returnedGenres, setReturnedGenres] = useState<DataType[]>([])
    const [returnedNuances, setReturnedNuances] = useState<DataType[]>([])


    const loadData = async () => {
        const genres = await fetchGenre("genres");
        const nuances = await fetchGenre("nuances");
        setReturnedGenres(genres);
        setReturnedNuances(nuances);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
    }, [returnedGenres, returnedNuances]);

    const addData = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            if (genre) {
                await addDoc(collection(db, "genres"), {
                    name: genre,
                });
            }
            if (nuance) {
                await addDoc(collection(db, "nuances"), {
                    name: nuance,
                });

            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        loadData();
        setGenre("");
        setNuance("")
    }

    const uniqueGenres = () => {
        const unique = [...new Set(returnedGenres.map(item => item.name))].sort();
        return unique;
    }

    const uniqueNuances = () => {
        const unique = [...new Set(returnedNuances.map(item => item.name))].sort();
        return unique;
    }

    const RandomizeSelection = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const randomGenre = uniqueGenres()[Math.floor(Math.random() * uniqueGenres().length)];
        const randomNuance = uniqueNuances()[Math.floor(Math.random() * uniqueNuances().length)];
        setRandom(`${randomGenre} ${randomNuance}`)
    }

    return (
        <>
            <TopBar />
            <div className='result'>
                <Button variant="outlined" startIcon={<CelebrationIcon />} onClick={(e) => RandomizeSelection(e)}>
                    Randomize book selection
                </Button>
                {random && <Typography variant="overline">{random}</Typography>}


            </div>
            <Container maxWidth="sm">
                <div className='form'>
                    <TextField id="outlined-basic" label="Genre" variant="outlined" value={genre} onChange={(e) => setGenre(e.target.value)} />
                    <TextField id="outlined-basic" label="Nuance" variant="outlined" value={nuance} onChange={(e) => setNuance(e.target.value)} />
                    <Button variant="contained" type='submit' onClick={addData}>Submit</Button>
                </div>

                <div className='collections'>
                    <div>
                        <h1>Genres</h1>
                        <ul>
                            {uniqueGenres().map((genre, i) => {
                                if (genre) {
                                    return <li key={i}>{genre}</li>
                                }
                            })}
                        </ul>
                    </div>
                    <div>
                        <h1>Nuances</h1>
                        <ul>
                            {uniqueNuances().map((nuance, i) => {
                                if (nuance) {
                                    return <li key={i}>{nuance}</li>
                                }

                            })}
                        </ul>
                    </div>
                </div>

            </Container>

        </>
    )
}

