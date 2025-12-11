
import React, { useEffect, useState } from 'react';
const Activities = () => {
  const [activities, setActivities] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const protocol = codespace === 'localhost' ? 'http' : 'https';
  const apiUrl = `${protocol}://${codespace}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Fetching Activities from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Activities data:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [apiUrl]);

  return (
    <div className="card shadow p-4 mt-4">
      <h2 className="mb-4 text-primary">Activities</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            {activities.length > 0 && Object.keys(activities[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, idx) => (
            <tr key={activity.id || idx}>
              {Object.values(activity).map((value, i) => (
                <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary mt-3" onClick={() => window.location.reload()}>Refresh</button>
    </div>
  );
};

export default Activities;
