import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function AdminAddProduct({ onProductAdded }) {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
  }, []);

  // const navigate = useNavigate('/delete-product');
  const API_URL = process.env.REACT_APP_API_URL;

  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [page, setPage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      const compressed = await imageCompression(file, options);
      const timestamp = Date.now();
      const newFileName = `${timestamp}_${file.name}`;

      const newFile = new File([compressed], newFileName, {
        type: compressed.type,
      });

      setImage(newFile);
      setImagePreview(URL.createObjectURL(newFile));
    } catch (err) {
      console.error('Image compression error:', err);
      setErrorMessage('❌ Failed to compress image.');
      setTimeout(() => setErrorMessage(''), 4000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image || !page) {
      setErrorMessage('Please fill in all fields, including the page.');
      setTimeout(() => setErrorMessage(''), 4000);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('page', page);

    try {
      const token = localStorage.getItem('token');

      await axios.post(`${API_URL}/api/products/add_product`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Product added successfully!');
      setErrorMessage('');
      setName('');
      setPage('');
      setImage(null);
      setImagePreview(null);
      if (onProductAdded) onProductAdded();

      setTimeout(() => {
        setSuccessMessage('');
        // navigate('/admin/products'); // Optional redirect
      }, 3000);
    } catch (err) {
      const msg = err.response?.data?.error || '❌ Failed to add product.';
      setErrorMessage(msg);
      setSuccessMessage('');
      setTimeout(() => setErrorMessage(''), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-1 body" data-aos="fade-up" style={{ fontSize: '0.9rem' }}>
      <br /><br />
      <h3
        className="display-6 text-primary"
        style={{
          textAlign: 'center',
        }}
      >
        Add New Product
      </h3>
      <br />

      <form
        onSubmit={handleSubmit}
        style={{
          margin: 'auto',
          backgroundColor: '#FDF5F5',
          padding: '20px',
          width: '100%',
          borderRadius: '5px',
        }}
      >
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group mt-3">
          <label>Product Image:</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group mt-3">
          <label>Select Page:</label>
          <select
            className="form-control"
            value={page}
            onChange={(e) => setPage(e.target.value)}
            required
            disabled={loading}
          >
            <option value=""> ** Choose a page </option>
            <option value="combined">Combined Page</option>
            <option value="our-products">Our Products</option>
            <option value="marble">Marble Sheets</option>
            <option value="cornices">Gypsum Cornices</option>
            <option value="lights">Gypsum Lights</option>
            <option value="panels">Gypsum Panels</option>
            <option value="metals">Gypsum Metals</option>
            <option value="boots">Saftey Boots</option>
            <option value="undercoat">Undercoat</option>
            <option value="cement">Gypsum POP</option>
            <option value="nails">Nails</option>
            <option value="boards">Gypsum Boards</option>
            <option value="tiles">Tiles</option>
          </select>
        </div>

        {imagePreview && (
          <div className="mt-3 text-center">
            <p><strong>Preview:</strong></p>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxHeight: '200px', objectFit: 'cover' }}
            />
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            type="submit"
            className="order-btn mt-4 w-50 text-align-center"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload Product'}
          </button>
        </div>
      </form>

      {successMessage && (
        <div
          className="text-center mt-3"
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            animation: 'fade-in 0.5s ease-in-out',
            backgroundColor: '#d4edda',
            color: '#155724',
            fontWeight: '700',
            fontSize: '1.3rem',
            padding: '15px 25px',
            borderRadius: '12px',
            border: '2px solid #c3e6cb',
            boxShadow: '0 4px 12px rgba(40, 167, 69, 0.25)',
            userSelect: 'none',
            letterSpacing: '0.03em',
          }}
        >
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div
          className="text-center mt-3"
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            animation: 'fade-in 0.5s ease-in-out',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            fontWeight: '700',
            fontSize: '1.3rem',
            padding: '15px 25px',
            borderRadius: '12px',
            border: '2px solid #f5c6cb',
            boxShadow: '0 4px 12px rgba(220, 53, 69, 0.25)',
            userSelect: 'none',
            letterSpacing: '0.03em',
          }}
        >
          {errorMessage}
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default AdminAddProduct;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import imageCompression from 'browser-image-compression';
// import { useNavigate } from 'react-router-dom';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// function AdminAddProduct({ onProductAdded }) {
//   useEffect(() => {
//     AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
//   }, []);

//   const navigate = useNavigate();

//   const [name, setName] = useState('');
//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [page, setPage] = useState(''); // 🔹 New state for selected page
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     try {
//       const options = {
//         maxSizeMB: 0.5,
//         maxWidthOrHeight: 800,
//         useWebWorker: true,
//       };

//       const compressed = await imageCompression(file, options);
//       const timestamp = Date.now();
//       const newFileName = `${timestamp}_${file.name}`;

//       const newFile = new File([compressed], newFileName, {
//         type: compressed.type,
//       });

//       setImage(newFile);
//       setImagePreview(URL.createObjectURL(newFile));
//     } catch (err) {
//       console.error('Image compression error:', err);
//       setErrorMessage('❌ Failed to compress image.');
//       setTimeout(() => setErrorMessage(''), 4000);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !image || !page) {
//       setErrorMessage('Please fill in all fields, including the page.');
//       setTimeout(() => setErrorMessage(''), 4000);
//       return;
//     }

//     setLoading(true);

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('image', image);
//     formData.append('page', page); // 🔹 Send page with form

//     try {
//       const token = localStorage.getItem('token');

//       await axios.post('http://127.0.0.1:5000/api/products/add_product', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setSuccessMessage('✅ Product added successfully!');
//       setErrorMessage('');
//       setName('');
//       setPage('');
//       setImage(null);
//       setImagePreview(null);
//       if (onProductAdded) onProductAdded();

//       setTimeout(() => {
//         setSuccessMessage('');
//         // navigate('/admin/products'); // Optional redirect
//       }, 3000);
//     } catch (err) {
//       const msg = err.response?.data?.error || '❌ Failed to add product.';
//       setErrorMessage(msg);
//       setSuccessMessage('');
//       setTimeout(() => setErrorMessage(''), 4000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-1" data-aos="fade-up">
//       <br /><br />
//       <h3
//         style={{
//           paddingTop: '35px',
//           textAlign: 'center',
//           color: 'rgb(10, 10, 87)',
//           textShadow: '0 0 1px rgb(3, 3, 22), 0 0 1px rgb(22, 10, 158)',
//         }}
//         className="display-6"
//       >
//         Add New Product
//       </h3>
//       <br />

//       <form
//         onSubmit={handleSubmit}
//         style={{
//           margin: 'auto',
//           backgroundColor: '#FDF5F5',
//           padding: '20px',
//           width: '700px',
//           borderRadius: '5px',
//         }}
//       >
//         <div className="form-group">
//           <label>Product Name:</label>
//           <input
//             type="text"
//             className="form-control"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             disabled={loading}
//           />
//         </div>

//         <div className="form-group mt-3">
//           <label>Product Image:</label>
//           <input
//             type="file"
//             className="form-control"
//             accept="image/*"
//             onChange={handleImageChange}
//             required
//             disabled={loading}
//           />
//         </div>

//         <div className="form-group mt-3">
//           <label>Select Page:</label>
//           <select
//             className="form-control"
//             value={page}
//             onChange={(e) => setPage(e.target.value)}
//             required
//             disabled={loading}
//           >
//             <option value="">-- Choose a page --</option>
//             <option value="combined">Combined Page</option>
//             <option value="living">Products</option>
//             <option value="outdoor">Outdoor</option>
//             {/* Add more options here as needed */}
//           </select>
//         </div>

//         {imagePreview && (
//           <div className="mt-3 text-center">
//             <p><strong>Preview:</strong></p>
//             <img
//               src={imagePreview}
//               alt="Preview"
//               style={{ maxHeight: '200px', objectFit: 'cover' }}
//             />
//           </div>
//         )}

//         <div style={{ display: 'flex', justifyContent: 'center' }}>
//           <button
//             type="submit"
//             className="order-btn mt-4 w-50 text-align-center"
//             disabled={loading}
//             style={{ backgroundColor: 'rgba(255, 69, 0, 0.88)' }}
//           >
//             {loading ? 'Uploading...' : 'Upload Product'}
//           </button>
//         </div>
//       </form>

//       {successMessage && (
//         <div
//           className="alert alert-success text-center mt-3"
//           style={{
//             maxWidth: '700px',
//             margin: '0 auto',
//             animation: 'fade-in 0.5s ease-in-out',
//           }}
//         >
//           {successMessage}
//         </div>
//       )}

//       {errorMessage && (
//         <div
//           className="alert alert-danger text-center mt-3"
//           style={{
//             maxWidth: '700px',
//             margin: '0 auto',
//             animation: 'fade-in 0.5s ease-in-out',
//           }}
//         >
//           {errorMessage}
//         </div>
//       )}

//       <style>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(-5px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default AdminAddProduct;




