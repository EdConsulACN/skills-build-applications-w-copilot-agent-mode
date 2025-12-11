import React, { useEffect, useState } from 'react';
const Teams = () => {
  const [teams, setTeams] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const protocol = codespace === 'localhost' ? 'http' : 'https';
  const apiUrl = `${protocol}://${codespace}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Fetching Teams from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Teams data:', results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [apiUrl]);

  return (
    <div className="card shadow p-4 mt-4">
      <h2 className="mb-4 text-info">Teams</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            {teams.length > 0 && Object.keys(teams[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {teams.map((team, idx) => (
            <tr key={team.id || idx}>
              {Object.values(team).map((value, i) => (
                <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-info mt-3" onClick={() => window.location.reload()}>Refresh</button>
    </div>
  );
};

export default Teams;
