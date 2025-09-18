import { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

const useContactInfo = () => {
  const [contact, setContact] = useState({
    location: '',
    phone: '',
    email: '',
    whatsapp: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: ''
  });

  useEffect(() => {
    fetch(`${API_URL}/api/contact/get`)
      .then(res => res.json())
      .then(data => setContact(data))
      .catch(err => console.error("Failed to load contact info", err));
  }, []);

  return contact;
};

export default useContactInfo;
