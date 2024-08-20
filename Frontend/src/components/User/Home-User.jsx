import React from 'react';
import { Typography, Grid, Paper, Container, Card, CardContent, CardActionArea } from '@mui/material';
import '../HomePage.css';
import NavbarUser from './NavBarUser';

const HomePageUser = () => {
  return (
    <>
    <NavbarUser/>
    <div className="root">
      <Container className="styledcontainer"maxWidth="md">
        {/* <Paper className="styledPaper"> */}
          <Typography variant="h4" gutterBottom className="styledTitle">
            Welcome to TechCodeHub
          </Typography>
          <Typography variant="body1" gutterBottom className="styledDescription">
            Your go-to place for the latest E-Books, Code snippets, and Tech news. Whether you are a Beginner or an Experienced Developer, We Have Something For Everyone.
          </Typography>
          <Grid container spacing={4} sx={{ marginTop: '2rem' ,}}>
            <Grid item xs={12} sm={6}>
              <Card className="gridItem" sx={{backgroundColor:'rgba(255, 255, 255, 0.3)'}}>
                <CardActionArea href="/books">
                  <CardContent>
                    <Typography variant="h5" gutterBottom  className="styledSectionTitle">E-Books</Typography>
                    <Typography variant="body2" className="styledSectionDescription">
                      Check out our latest e-books on computer subjects, including programming, networking, cybersecurity, and more.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card className="gridItem" sx={{backgroundColor:'rgba(255, 255, 255, 0.3)'}}>
                <CardActionArea href="/programs">
                  <CardContent>
                    <Typography variant="h5" className="styledSectionTitle">Code Snippets</Typography>
                    <Typography variant="body2" className="styledSectionDescription">
                      Find and share code snippets to help you understand and learn various computer science concepts, from algorithms to data structures and more.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className="gridItem" sx={{backgroundColor:'rgba(255, 255, 255, 0.3)'}}>
                <CardActionArea href="/technews">
                  <CardContent>
                    <Typography variant="h5" className="styledSectionTitle">Tech News</Typography>
                    <Typography variant="body2" className="styledSectionDescription">
                      Stay updated with the latest tech news and trends from around the world.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        {/* </Paper> */}
      </Container>
    </div>
    </>
    
  );
};

export default HomePageUser;
