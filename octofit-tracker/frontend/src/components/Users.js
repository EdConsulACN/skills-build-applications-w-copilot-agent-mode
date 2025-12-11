import React, { useEffect, useState } from 'react';
const Users = () => {
  const [users, setUsers] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const protocol = codespace === 'localhost' ? 'http' : 'https';
  const apiUrl = `${protocol}://${codespace}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Fetching Users from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Users data:', results);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [apiUrl]);

  return (
    <div className="card shadow p-4 mt-4">
      <h2 className="mb-4 text-warning">Users</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            {users.length > 0 && Object.keys(users[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.id || idx}>
              {Object.values(user).map((value, i) => (
                <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-warning mt-3" onClick={() => window.location.reload()}>Refresh</button>
    </div>
  );
};

export default Users;
