import React, { useEffect, useState } from 'react';
const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const protocol = codespace === 'localhost' ? 'http' : 'https';
  const apiUrl = `${protocol}://${codespace}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Fetching Workouts from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Workouts data:', results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [apiUrl]);

  return (
    <div className="card shadow p-4 mt-4">
      <h2 className="mb-4 text-danger">Workouts</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            {workouts.length > 0 && Object.keys(workouts[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout, idx) => (
            <tr key={workout.id || idx}>
              {Object.values(workout).map((value, i) => (
                <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-danger mt-3" onClick={() => window.location.reload()}>Refresh</button>
    </div>
  );
};

export default Workouts;
