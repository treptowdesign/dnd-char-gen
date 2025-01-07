'use client';

export default function TestBtn() {
  const handleTestProtectedRoute = async () => {
    fetch('/api/protected')
    .then(res => res.json())
    .then(console.log);
  };

  return (
    <button onClick={handleTestProtectedRoute}>
        Test Protected Route
    </button>
  );
}
