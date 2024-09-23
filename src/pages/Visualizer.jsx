import React, { useState, useRef } from 'react';
import * as d3 from 'd3';
import { isAddress } from 'ethers';

export default function Visualizer() {
  const [inputValue, setInputValue] = useState('');
  const [validationMessage, setValidationMessage] = useState(null);
  const [currentCenter, setCurrentCenter] = useState(null); // To track the current center address
  const svgRef = useRef(null);

  const jsonData = {
    walletAddresses: [
      "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      "0xAbC123456789dEf0ABC123456789DEF012345678",
      "0xDEF123456789dEf0ABC123456789DEF012345679",
      "0x456AbC123789dEf0ABC123456789DEF012345671",
      "0x123456789AbC123DEF456789dEf0ABC12345678"
    ],
    transactions: [
      { from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", to: "0xAbC123456789dEf0ABC123456789DEF012345678", hash: "0xabc123456789def0123456789abcdef0123456789abcdef0123456789abcdef0" },
      { from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", to: "0xDEF123456789dEf0ABC123456789DEF012345679", hash: "0x123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0" },
      { from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", to: "0x456AbC123789dEf0ABC123456789DEF012345671", hash: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef" },
      { from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", to: "0x123456789AbC123DEF456789dEf0ABC12345678", hash: "0xdef123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef" },
      { from: "0xDEF123456789dEf0ABC123456789DEF012345679", to: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", hash: "0x987654321abcdef0123456789abcdef0123456789abcdef0123456789abcdef0" },
      { from: "0xDEF123456789dEf0ABC123456789DEF012345679", to: "0x123456789AbC123DEF456789dEf0ABC12345678", hash: "0x6e7654321abcdef0123r56789abcdef0123456789abcdef0123456789abcdef0" }
    ]
  };

  // Function to validate wallet address
  function validateWalletAddress(address) {
    return isAddress(address);
  }

  // Function to validate transaction hash
  function validateTransactionHash(hash) {
    const transactionHashPattern = /^0x([A-Fa-f0-9]{64})$/;
    return transactionHashPattern.test(hash);
  }

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setInputValue(value);

    if (validateWalletAddress(value)) {
      if (jsonData.walletAddresses.includes(value)) {
        setValidationMessage("Valid wallet address found in JSON!");
        setCurrentCenter(value); // Set as current center
        renderGraph({ type: 'wallet', value });
      } else {
        setValidationMessage("Valid wallet address but not found in JSON.");
        clearGraph();
      }
    } else if (validateTransactionHash(value)) {
      const transaction = jsonData.transactions.find(tx => tx.hash.toLowerCase() === value.toLowerCase());
      if (transaction) {
        setValidationMessage("Valid transaction hash found in JSON!");
        renderGraph({ type: 'transaction', transaction });
      } else {
        setValidationMessage("Valid transaction hash but not found in JSON.");
        clearGraph();
      }
    } else {
      setValidationMessage("Invalid input. Please enter a valid wallet address or transaction hash.");
      clearGraph();
    }
  };

  const handleNodeClick = (address) => {
    setValidationMessage(`Clicked on wallet address: ${address}`);
    setCurrentCenter(address);
    renderGraph({ type: 'wallet', value: address });
  };

  const clearGraph = () => {
    d3.select(svgRef.current).selectAll("*").remove();
    setCurrentCenter(null);
  };

  const renderGraph = ({ type, value, transaction }) => {
    // Clear previous graph if any
    d3.select(svgRef.current).selectAll("*").remove();

    let nodes = [];
    let links = [];

    if (type === 'wallet') {
      // Create a dataset to represent wallet connections
      nodes = [{ id: value }, ...jsonData.walletAddresses.filter(addr => addr !== value).map(addr => ({ id: addr }))];
      links = jsonData.transactions.filter(tx => tx.from.toLowerCase() === value.toLowerCase() || tx.to.toLowerCase() === value.toLowerCase())
        .map(tx => ({ source: tx.from, target: tx.to, hash: tx.hash }));
    } else if (type === 'transaction') {
      nodes = [{ id: transaction.from }, { id: transaction.to }];
      links = [{ source: transaction.from, target: transaction.to, hash: transaction.hash }];
    }

    // Create SVG dimensions
    const width = 1400;
    const height = 600;

    // Create a force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Create an SVG element
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create link elements (lines between nodes)
    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-width', 2)
      .on('mouseover', function(event, d) {
        d3.select(this).attr('stroke', '#555');
        tooltip
          .style('opacity', 1)
          .html(`Hash: ${d.hash}`)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY + 10}px`);
      })
      .on('mouseout', function() {
        d3.select(this).attr('stroke', '#999');
        tooltip.style('opacity', 0);
      });

    // Create node elements (circles for wallets)
    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', '#69b3a2')
      .call(drag(simulation)) // Add drag behavior
      .on('click', (event, d) => {
        handleNodeClick(d.id);
      })
      .on('mouseover', function(event, d) {
        d3.select(this).attr('fill', '#40a9f3');
        tooltip
          .style('opacity', 1)
          .html(`Address: ${d.id}`)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY + 10}px`);
      })
      .on('mouseout', function() {
        d3.select(this).attr('fill', '#69b3a2');
        tooltip.style('opacity', 0);
      });

    // Add labels to nodes
    const text = svg.append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .attr('dy', -15)
      .attr('dx', 10)
      .text(d => d.id.substring(0, 6) + '...');

    // Create a tooltip div that is hidden by default
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('text-align', 'left')
      .style('width', '200px')
      .style('padding', '8px')
      .style('font', '12px sans-serif')
      .style('background', 'lightsteelblue')
      .style('border', '1px solid #fff')
      .style('border-radius', '8px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    // Update simulation on each tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      text
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    });

    // Remove tooltip when simulation ends
    simulation.on('end', () => {
      tooltip.remove();
    });
  };

  // Define drag behavior
  const drag = (simulation) => {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  };

  return (
    <div className='w-full mt-10'>
      <div className='w-full my-10'>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className='border px-3 py-1 shadow-lg ml-10 w-80 sm:w-96 rounded-lg'
          placeholder='Enter wallet address or transaction hash'
        />
        {validationMessage && (
          <p className={`ml-10 mt-2 ${validationMessage.includes("Invalid") ? 'text-red-500' : 'text-green-500'}`}>
            {validationMessage}
          </p>
        )}
      </div>
      <svg ref={svgRef}></svg>
    </div>
  );
}
