import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VotingRegistrationListView } from './containers/VotingRegistration/RegistrationListView.container';
import { RegistrationCreateView } from './containers/VotingRegistration/RegistrationCreateView.container';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VotingRegistrationListView />} />
        <Route
          path="/vote-registration/register"
          element={<RegistrationCreateView />}
        />
      </Routes>
    </Router>
  );
}

export default App;
