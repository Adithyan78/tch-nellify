import React from 'react';
import { Typography, Grid, Container, Card, CardContent, CardActionArea, CardMedia, Box } from '@mui/material';
import './HomePage.css';

const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: '4rem' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          className="styledTitle" 
          sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            paddingX: { xs: '1rem', sm: '2rem' },
            marginBottom: '1rem',
            fontWeight: 'bold',
            // color: '#222',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        >
          Welcome to TechCodeHub
        </Typography>
        <Typography 
          variant="h6" 
          className="styledDescription" 
          sx={{ 
            margin: 'auto', 
            maxWidth: { xs: '100%', sm: '80%', md: '70%' }, 
            marginTop: '0.5rem',
            fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.3rem' },
            paddingX: { xs: '1rem', sm: '2rem' },
            color: '#555',
            lineHeight: '1.5',
            letterSpacing: '0.5px'
          }}
        >
          Your go-to place for the latest E-Books, Code snippets, and Tech news. Whether you are a Beginner or an Experienced Developer, We Have Something For Everyone.
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ marginTop: '3rem' }}>
        {[
          { title: 'E-Books', description: 'Check out our latest e-books on computer subjects...', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaf1CRA7NvyYHG170F1MqCP1YsQPKumstNdQ&s', link: '/books' },
          { title: 'Code Snippets', description: 'Find and share code snippets to help you...', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAA/FBMVEUwMDCr5oMrJy0wKyYkGykoISsjFygwLSl7omIxUGgzqvUxX4CTxHKu64ae1HopJCz///8uLC9ASjpuj1khISGgoKBPT09ge09RZEX/6JAlIyEeIiqwoGgWGyjWwnvo0YMYFBDm9//h8f8qKSj/qKMiKC2Mlp7Aztr/uXohKioykc7P3uwXIyswJRifqbQyealPPz5OQjjr/f8VJSagbGmddVN5gIeIX1yGZktiaG1uUE5sVUIxbZUwNTn/7ZMwQlC0wMzfkY0znN9VUD+jlGIwTGCNgVhmg1Q/QEI6QDZCOzWGj5dnbXKHh4c0NzMGBgZtZUqAdlKMuW5TV1p8RGiwAAADJ0lEQVR4nO3ba1PaQBSA4S2agq2UrqjQaFswRdrai5dqvVG0VsVLrZf//1+6J1GIJHSGGdKdWd7nU2bYD4cz4XA2e6IUAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgvPxzb4WZiaji2w83AxP6z4exP2A555MiB0Xo+nJbtgLMwMRzb4QJAlvRCjFYPNVI+8dJo2wGPnj5ajDnSqvU11FK6Wkgz414SFn69illcyE9FrdBx3isUnyQVyyXbIY9c4+RHLwU/Thr54ygH7XypXExzmrMd8ujpRpzZRkb1wOwPc+lsBwwAyFRQC5kr7+lgnvk8WhhYjjcDweWKaPrKK7wYrOApvxmuvHQvCf5yfclYr6nJ6ZS28MH0pKqty8L6sm875JELdpriwFel8vRgpkP2D8KVO+7dB/f1YNZclSYHk03CrKv1AAB6AhFe6QTLof0386JjLq5m+p1JElaFLDxfE3aDzYR/sV43lqRHSj408tTG4TtxuKE+vQ9tNmyHPHLxPjHx/LBYGoscqM6y2AqUrpb7VcxvYfeb2FWqsb0pzm0HnAVfSFHUpX7hs8MPQi4enjgCgLt0sgwG3TIZzCbYjjcD+uzx3+GpVsFO+Hd5Gajg91zCvO2IR69UftwZFa9UrSltU32lpv68TJpz707I9Z+sKjV7IN1zvTk2OVAqZZvU3UZ15hNsh5uJlO1ybzsdJFiNFQAypl/HSEX8HDIXudTTFgefMerrNzHXWrU/hloqV0k9dau6lwRm88x9cPM25qaRb/8MtVXuNPUUvuLeffC4HshsXq8epE5jOJgCAEBMtCOWQasBM9rdSW3f1c1z78zVu02d1Y/ceqq2JAvXL9ybS/vnmWuvO3R7Nu/uizDfLFdJfXcnUsmZbIUr7xz8MUSHCWE9SH2HKxLWg+6xAwA4q9v56ERjFO6Tu3Mo2tk5lM6WuAyUnqn0k+dmq9/FqknB3ra4sh3w6JkeKWz/xnku7T4H9fT5xPHIgVI7wnR/+qzaT97vXt0V8ltY2xO2w81Eryamzyv3auJYjTADAAAAAAAAAAAAAAAAAAAAAAAAAAAAGGd/AcyuncBhnoAqAAAAAElFTkSuQmCC', link: '/programs' },
          { title: 'Tech News', description: 'Stay updated with the latest tech news and trends...', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWDrdmOdWPaQIRcqPomRG95EIKqMeld8Pzqg&s', link: '/technews' }
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="gridItem">
              <CardActionArea href={item.link} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={item.image}
                  alt={item.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, }}>
                  <Typography 
                    variant="h5" 
                    className="styledSectionTitle" 
                    sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
                  >
                    {item.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    className="styledSectionDescription" 
                    sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
