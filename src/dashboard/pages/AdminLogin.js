import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/LogIn.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function AdminLoginForm() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminCode, setShowAdminCode] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/user/login`, {
        phone,
        password,
        admin_code: adminCode || undefined,
      });

      const token = response.data.access_token;
      const user = response.data.user;

      localStorage.setItem('token', token);

      alert('User logged in successfully!');
      setPhone('');
      setPassword('');
      setAdminCode('');

      if (user.is_admin && adminCode === 'Okumu@078@078') {
        navigate('/dashadmin/*');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{fontSize:'0.9rem'}}>
      <h4 style={{ textAlign: 'center', paddingTop: '30px' }} className='text-primary'>
        Admin Sign In
      </h4>

      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <form onSubmit={handleSubmit} autoComplete="off" className='login-form' data-aos="fade-up">

            <div>
              <label>Phone:</label><br />
              <input
                type="text"
                className="form-control"
                value={phone}
                autoComplete="off"
                readOnly
                onFocus={(e) => e.target.removeAttribute('readOnly')}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <br />

            <div>
              <label>Password:</label><br />
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  value={password}
                  autoComplete="new-password"
                  readOnly
                  onFocus={(e) => e.target.removeAttribute('readOnly')}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
            </div>
            <br />

            <div>
              <label>Administration Code:</label><br />
              <div className="input-group">
                <input
                  type={showAdminCode ? 'text' : 'password'}
                  className="form-control"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  placeholder=""
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowAdminCode(!showAdminCode)}
                >
                  <i className={`bi ${showAdminCode ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
              <button
                type="submit"
                className='login-btn'
                style={{ width: '50%', padding: '10px', color: 'white', border: 'none' }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
              <h5>
                <Link to="/forgot-password" style={{ textDecoration: 'none', color: 'black' }}>
                  Forgot Password?
                </Link>
              </h5>
            </div>
          </form>
        </div>
      </div>

      <br /><br />
    </div>
  );
}

export default AdminLoginForm;

