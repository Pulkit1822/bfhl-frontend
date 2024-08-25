import React, { useState } from 'react';
import './App.css';

function App() {
    const [jsonInput, setJsonInput] = useState('{"data": ["M", "1", "334", "4", "B"]}');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null); // Reset error state
        try {
            const parsedInput = JSON.parse(jsonInput);
            const data = parsedInput.data;

            const numbers = data.filter(item => !isNaN(item));
            const alphabets = data.filter(item => isNaN(item) && /^[a-zA-Z]+$/.test(item));
            const highestLowercaseAlphabet = alphabets.filter(item => /^[a-z]+$/.test(item)).sort().pop() || '';

            setResponse({
                numbers,
                alphabets,
                highest_lowercase_alphabet: highestLowercaseAlphabet
            });
        } catch (error) {
            console.error('Error:', error);
            setError('Invalid JSON input');
        }
    };

    const handleOptionChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(value);
    };

    const renderResponse = () => {
        if (!response) return null;
        const filteredResponse = {};
        if (selectedOptions.includes('Alphabets')) filteredResponse.alphabets = response.alphabets;
        if (selectedOptions.includes('Numbers')) filteredResponse.numbers = response.numbers;
        if (selectedOptions.includes('Highest lowercase alphabet')) filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;

        return (
            <div>
                {filteredResponse.numbers && (
                    <div>
                        <strong>Numbers:</strong> {filteredResponse.numbers.join(', ')}
                    </div>
                )}
                {filteredResponse.alphabets && (
                    <div>
                        <strong>Alphabets:</strong> {filteredResponse.alphabets.join(', ')}
                    </div>
                )}
                {filteredResponse.highest_lowercase_alphabet && (
                    <div>
                        <strong>Highest lowercase alphabet:</strong> {filteredResponse.highest_lowercase_alphabet}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="App">
            <div className="App-header">
                <h1>BFHL Challenge</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} rows="10" cols="50" />
                <button type="submit">Submit</button>
            </form>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <select multiple={true} onChange={handleOptionChange}>
                <option value="Alphabets">Alphabets</option>
                <option value="Numbers">Numbers</option>
                <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
            </select>
            {renderResponse()}
        </div>
    );
}

export default App;