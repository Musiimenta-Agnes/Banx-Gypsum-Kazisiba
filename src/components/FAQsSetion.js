// src/pages/FAQs.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = process.env.REACT_APP_API_URL;

const FAQsSection = () => {
  const [faqData, setFaqData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/questions/get_faqs`)
      .then((res) => {
        setFaqData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch FAQs:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  if (!faqData || !Array.isArray(faqData.faqs)) {
    return <div className="text-center p-5">No FAQs available</div>;
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center', color: 'black' }}>{faqData.title}</h2>
      <br />
      <div
        className="w-100"
        style={{ border: '1px solid black', borderRadius: '30px', padding: '30px' }}
      >
        <div className="row">
          {faqData.faqs.map(([question, answer], index) => {
            const isLastColumn = (index + 1) % 3 === 0;

            return (
              <div
                key={index}
                className="col-md-4 mb-4"
                style={{
                  borderRight: isLastColumn ? 'none' : '1px solid #ccc',
                  paddingRight: '20px',
                  paddingLeft: index % 3 === 0 ? '0' : '20px',
                }}
              >
                <h6 className="text-primary" data-aos="fade-up">
                  {question}
                </h6>
                <p data-aos="fade-up">{answer}</p>
              </div>
            );
          })}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default FAQsSection;
