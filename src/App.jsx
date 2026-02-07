import { db, auth } from './firebase/config';

function App() {
  console.log('Firebase DB:', db);
  console.log('Firebase Auth:', auth);
  
  return <div>Check your browser console - Firebase should be initialized!</div>;
}

export default App;