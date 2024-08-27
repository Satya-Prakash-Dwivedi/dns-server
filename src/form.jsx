import React, { useState } from 'react';

const DnsForm = () => {
    const [domainName, setDomainName] = useState('');
    const [type, setType] = useState('');
    const [ipValue, setIpValue] = useState('');
    const [ttl, setTtl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const recordData = {
            domainName,
            type,
            ipValue,
            ttl,
        };
        try {
            const response = await fetch('http://localhost:5000/api/dns/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recordData),
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Record added:', data);
                // Handle success, e.g., clear the form, show a success message
                setDomainName('');
                setType('');
                setIpValue('');
                setTtl('');
                alert('Record added successfully!');
            } else {
                console.error('Error adding record:', response.statusText);
                alert('Failed to add record.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error occurred while adding record.');
        }
    };

    return (
        <div>
            <h1>SATYA DNS SERVER</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Domain Name:</label>
                    <input
                        type="text"
                        value={domainName}
                        onChange={(e) => setDomainName(e.target.value)}
                        placeholder="Enter domain name"
                    />
                </div>
                <div>
                    <label>Type:</label>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="Enter type"
                    />
                </div>
                <div>
                    <label>IP Value:</label>
                    <input
                        type="text"
                        value={ipValue}
                        onChange={(e) => setIpValue(e.target.value)}
                        placeholder="Enter IP value"
                    />
                </div>
                <div>
                    <label>Time to Live:</label>
                    <input
                        type="number"
                        value={ttl}
                        onChange={(e) => setTtl(e.target.value)}
                        placeholder="Enter time to live"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default DnsForm;
