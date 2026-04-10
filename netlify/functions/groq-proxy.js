const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { topic, count } = JSON.parse(event.body);
  const apiKey = process.env.GROQ_API_KEY; // This grabs your secret key!

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: `Generate ${count} multiple choice quiz questions about "${topic}" for English language students.` }]
    })
  });

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};

