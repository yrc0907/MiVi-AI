// src/app/test-env/page.tsx

function EnvTestPage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'monospace', fontSize: '14px' }}>
      <h1>Environment Variable Test</h1>
      <p>This page runs on the server to display environment variables.</p>
      <hr style={{ margin: '1rem 0' }} />
      <h2>Variables:</h2>
      <ul>
        <li>
          <strong>APP_GOOGLE_CLIENT_ID:</strong>
          <pre>{process.env.APP_GOOGLE_CLIENT_ID || 'NOT FOUND'}</pre>
        </li>
        <li>
          <strong>APP_GOOGLE_CLIENT_SECRET:</strong>
          <pre>{process.env.APP_GOOGLE_CLIENT_SECRET || 'NOT FOUND'}</pre>
        </li>
        <li>
          <strong>APP_GITHUB_CLIENT_ID:</strong>
          <pre>{process.env.APP_GITHUB_CLIENT_ID || 'NOT FOUND'}</pre>
        </li>
        <li>
          <strong>GITHUB_CLIENT_SECRET:</strong>
          <pre>{process.env.APP_GITHUB_CLIENT_SECRET || 'NOT FOUND'}</pre>
        </li>
        <li>
          <strong>AUTH_SECRET:</strong>
          <pre>{process.env.AUTH_SECRET || 'NOT FOUND'}</pre>
        </li>
      </ul>
      <style>{`
        pre { 
          background-color: #f0f0f0; 
          padding: 0.5rem; 
          border-radius: 4px; 
          margin-top: 0.25rem;
          white-space: pre-wrap;
          word-break: break-all;
        }
      `}</style>
    </main>
  );
}

export default EnvTestPage; 