import React from 'react';

function Dashboard({ documents, onOpenDocument }) {
  // Count documents by status
  const draftCount = documents.filter(doc => doc.status === 'draft').length;
  const inProgressCount = documents.filter(doc => doc.status === 'in-progress').length;
  const completedCount = documents.filter(doc => doc.status === 'completed').length;

  // Get status class
  const getStatusClass = (status) => {
    switch (status) {
      case 'draft':
        return 'status-draft';
      case 'in-progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  // Format status for display
  const formatStatus = (status) => {
    switch (status) {
      case 'draft':
        return 'Szkic';
      case 'in-progress':
        return 'W trakcie';
      case 'completed':
        return 'Ukończony';
      default:
        return status;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Panel główny</h1>
        <p>Witaj w Biuro AI. Twórz dokumenty i zarządzaj nimi z łatwością przy pomocy AI.</p>
      </div>

      <div className="document-stats">
        <div className="stat-card">
          <h3>Wszystkie dokumenty</h3>
          <p>{documents.length}</p>
        </div>
        <div className="stat-card">
          <h3>Szkice</h3>
          <p>{draftCount}</p>
        </div>
        <div className="stat-card">
          <h3>W trakcie</h3>
          <p>{inProgressCount}</p>
        </div>
        <div className="stat-card">
          <h3>Ukończone</h3>
          <p>{completedCount}</p>
        </div>
      </div>

      <div className="documents-list">
        <div className="list-header">
          <div>Nazwa</div>
          <div>Data utworzenia</div>
          <div>Status</div>
          <div>Akcje</div>
        </div>
        {documents.map(doc => (
          <div key={doc.id} className="document-item" onClick={() => onOpenDocument(doc.id)}>
            <div>{doc.title}</div>
            <div>{doc.createdAt}</div>
            <div>
              <span className={`document-status ${getStatusClass(doc.status)}`}>
                {formatStatus(doc.status)}
              </span>
            </div>
            <div>
              <button className="btn btn-outline" onClick={(e) => {
                e.stopPropagation();
                onOpenDocument(doc.id);
              }}>
                Edytuj
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;