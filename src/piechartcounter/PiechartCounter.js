import React, { useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { TextField, Container, Grid, Typography } from '@mui/material';

function PiechartCounter() {
  const [data, setData] = useState([
    { title: 'Box 1', value: 0, color: '#E38627' },
    { title: 'Box 2', value: 0, color: '#C13C37' },
  ]);

  const [validationMessage, setValidationMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    const newValue = Number(value);

    if (newValue > 100) {
      setValidationMessage('Value cannot exceed 100');
      return;
    }

    setValidationMessage('');

    const otherValue = 100 - newValue;

    setData((prevData) =>
      prevData.map((item) =>
        item.title === name ? { ...item, value: newValue } : { ...item, value: otherValue }
      )
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const total = data.reduce((acc, item) => acc + item.value, 0);

    if (total > 100) {
      setValidationMessage('Total percentage should not exceed 100');
      return;
    }

    setValidationMessage('');

    // Add your code here to update the chart or perform further actions
  };

  return (
    <Container
      sx={{
        width: '400px',
        marginTop: '1rem',
        textAlign: 'center',
        border: '1px solid #ccc',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: '1rem',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: '40px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.5)' }} gutterBottom>
        % PieChart Counter !!
      </Typography>
      <Grid container justifyContent="center" spacing={2}>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12} sx={{ marginBottom: '10px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.5)' }}>
            <TextField
              label="Box 1"
              type="number"
              name="Box 1"
              inputProps={{ min: 0, max: 100 }}
              onBlur={handleChange}
              value={data[0].value}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.5)' }}>
            <TextField
              label="Box 2"
              type="number"
              name="Box 2"
              inputProps={{ min: 0, max: 100 }}
              onBlur={handleChange}
              value={data[1].value}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <button type="submit" style={{ display: 'none' }}>
              Create Chart
            </button>
          </Grid>
        </form>
      </Grid>
      {validationMessage && (
        <Typography variant="body2" color="error" sx={{ marginTop: '10px' }}>
          {validationMessage}
        </Typography>
      )}
      <Grid container justifyContent="center" sx={{ marginTop: '2rem' }}>
        <Grid item xs={12} sx={{ position: 'relative' }}>
          <PieChart
            data={data}
            style={{
              width: '100%',
              height: '250px',
              animation: 'rotate 5s linear infinite',
            }}
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
          />
          <style>
            {`
            @keyframes rotate {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
          </style>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {data.map((item) => (
              <div key={item.title}>
                <div
                  style={{
                    backgroundColor: item.color,
                    width: '10px',
                    height: '10px',
                    display: 'inline-block',
                    marginRight: '4px',
                  }}
                ></div>
                {item.title}
              </div>
            ))}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PiechartCounter;
