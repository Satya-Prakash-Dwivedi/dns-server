import React, { useState } from 'react';

function DNSQueryTool() {
  const [domain, setDomain] = useState('');
  const [dnsType, setDnsType] = useState('A');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Placeholder for query function
    queryDNS(domain, dnsType);
  };

  const queryDNS = async (domain, dnsType) => {
    const response = await fetch(`https://dns.google/resolve?name=${domain}&type=${dnsType}`);
    const data = await response.json();
    setResult(data);
  };
  

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl text-center mb-4">Satya DNS Query Tool</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter Domain Name"
          className="border rounded p-2 mb-4 w-64"
        />
        <select
          value={dnsType}
          onChange={(e) => setDnsType(e.target.value)}
          className="border rounded p-2 mb-4 w-64"
        >
          <option value="A">A (IPv4)</option>
          <option value="AAAA">AAAA (IPv6)</option>
          <option value="MX">MX (Mail Server)</option>
          <option value="CNAME">CNAME (Alias)</option>
        </select>
        <button onClick={queryDNS} type="submit" className="bg-blue-500 text-white rounded py-2 px-4">
          Query
        </button>
      </form>

      {/* Result Display */}
      {result && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl">Results</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default DNSQueryTool;
