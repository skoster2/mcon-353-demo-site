import '../apps/App.css';
import { Button } from "@mui/material";
import React, { useState} from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import face from './face.jpg';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';




export function Home() {
  const {value, setValue} = useState(55);
  
  return (
    <><><><div class="mdc-banner" role="banner">
      <div class="mdc-banner__content"
        role="alertdialog"
        aria-live="assertive">
        <div class="mdc-banner__graphic-text-wrapper">
          <div class="mdc-banner__text">
            Welcome to my home page.
          </div>
        </div>
      </div>
    </div><div className="App">
        <div>
          <img src={face} className="faceImage" alt="face" />
        </div>

      </div></>
      <Card sx={{ minWidth: 275 }} className="card">
        <CardContent className="card">
          <Typography variant="h5" component="div">
            Shaindy Koster
          </Typography>
          <Typography variant="body2">
            Shaindy is a very busy young adult. She is a permanent sub in BYQ as well as an assistant bookkeeper in Frank Plumbing Supply.
            She is also a college senior in Touro College, majoring in Computer Science. If she had any free time, she would be spending
            time with family and friends, reading the Hamodia, and doing the daily crossword puzzle.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </><Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="info">Come visit again. More content coming soon!</Alert>
      </Stack></>
  );
}


