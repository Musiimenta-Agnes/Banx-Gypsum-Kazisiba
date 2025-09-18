import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedImage, setUpdatedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const API_URL = process.env.REACT_APP_API_URL;

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/products/get_all_products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.products || []);
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to fetch products');
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/products/delete_products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Product deleted successfully');
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to delete product');
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setUpdatedName(product.name);
    setImagePreview(`${API_URL}${product.image_url}`);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('name', updatedName);
    if (updatedImage) {
      formData.append('image', updatedImage);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/api/products/update_products/${selectedProduct.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Product updated successfully');
      setShowModal(false);
      fetchProducts(); // Refresh list
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || '❌ Update failed');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container" style={{ fontSize: '0.9rem' }}>
      <br />
      <h3 className='text-primary'
      style={{
        textAlign: 'center',
      }}>
        Admin: Manage Products
      </h3>
      <br />
      <table className="table table-bordered">
        <thead className="table-primary">
          <tr>
            <th >Image</th>
            <th>Name</th>
            <th>Edit Product</th>
            <th>Delete Product</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((prod) => (
              <tr key={prod.id}>
                <td>
                  <img
                    src={`${API_URL}${prod.image_url}`}
                    alt={prod.name}
                    style={{ width: '80px', objectFit: 'cover' }}
                  />
                </td>
                <td>{prod.name}</td>
                <td>
                  <button
                    onClick={() => openEditModal(prod)}
                    className="order-btn"
                    style={{ width: '100px', borderRadius: '1px', height: '30px' }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deleteProduct(prod.id)}
                    className="btn btn-sm btn-danger"
                    style={{ width: '100px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No products available.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label>Product Name:</label>
              <input
                className="form-control"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>New Image (optional):</label>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setUpdatedImage(file);
                  setImagePreview(URL.createObjectURL(file));
                }}
              />
            </div>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: '100px', marginBottom: '10px' }}
              />
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button className='order-btn' onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminProductList;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Modal, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const AdminProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [updatedName, setUpdatedName] = useState('');
//   const [updatedImage, setUpdatedImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState('');

//   const fetchProducts = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('http://127.0.0.1:5000/api/products/get_all_products', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts(res.data.products || []);
//     } catch (err) {
//       console.error(err);
//       toast.error('❌ Failed to fetch products');
//     }
//   };

//   const deleteProduct = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this product?')) return;
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://127.0.0.1:5000/api/products/delete_products/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success('Product deleted successfully');
//       setProducts((prev) => prev.filter((p) => p.id !== id));
//     } catch (err) {
//       console.error(err);
//       toast.error('❌ Failed to delete product');
//     }
//   };

//   const openEditModal = (product) => {
//     setSelectedProduct(product);
//     setUpdatedName(product.name);
//     setImagePreview(`http://127.0.0.1:5000${product.image_url}`);
//     setShowModal(true);
//   };

//   const handleUpdate = async () => {
//     const formData = new FormData();
//     formData.append('name', updatedName);
//     if (updatedImage) {
//       formData.append('image', updatedImage);
//     }

//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(`http://127.0.0.1:5000/api/products/update_products/${selectedProduct.id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       toast.success('✅ Product updated successfully');
//       setShowModal(false);
//       fetchProducts(); // Refresh list
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.error || '❌ Update failed');
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <br />
//       <h3 style={{
//         textAlign: 'center',
//         color: 'rgb(10, 10, 87)',
//         textShadow: '0 0 1px rgb(3, 3, 22), 0 0 1px rgb(22, 10, 158)',
//       }}>
//         Admin: Manage Products
//       </h3>
//       <br />
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Edit Product</th>
//             <th>Delete Product</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Array.isArray(products) && products.length > 0 ? (
//             products.map((prod) => (
//               <tr key={prod.id}>
//                 <td>
//                   <img
//                     src={`http://127.0.0.1:5000${prod.image_url}`}
//                     alt={prod.name}
//                     style={{ width: '80px', objectFit: 'cover' }}
//                   />
//                 </td>
//                 <td>{prod.name}</td>
//                 <td>
   
//                   <button
//                     onClick={() => openEditModal(prod)}
//                     className="btn btn-sm btn-info" style={{width:'100px'}}
//                   >
//                     Edit
//                   </button>
//               </td>

//               <td>
//               <button
//                     onClick={() => deleteProduct(prod.id)}
//                     className="btn btn-sm btn-danger"  style={{width:'100px'}}
//                   >
//                     Delete 
//                   </button>
//               </td>

//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3" className="text-center">No products available.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* EDIT PRODUCT MODAL */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Product</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form>
//             <div className="mb-3">
//               <label>Product Name:</label>
//               <input
//                 className="form-control"
//                 value={updatedName}
//                 onChange={(e) => setUpdatedName(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <label>New Image (optional):</label>
//               <input
//                 className="form-control"
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   const file = e.target.files[0];
//                   setUpdatedImage(file);
//                   setImagePreview(URL.createObjectURL(file));
//                 }}
//               />
//             </div>
//             {imagePreview && (
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 style={{ width: '100px', marginBottom: '10px' }}
//               />
//             )}
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleUpdate}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default AdminProductList;



