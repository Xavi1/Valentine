// Type declaration for App.jsx
// This allows TypeScript to recognize the module and avoid implicit 'any' type errors.
declare module './App.jsx' {
	import * as React from 'react';
	const App: React.FC;
	export default App;
}
