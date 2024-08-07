import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/lnav';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import insta from '../images/instagram.png';
import whatsapp from '../images/whatsapp.png';
import mail from '../images/envelope.png';
import './login.css';
import './Sig.css'
import Modal from 'react-modal';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log({ username, password });
    try {
      const response = await axios.post('https://fback-vteb.onrender.com/login', {
        username: username,
        password: password,
      });
      if (!response.data.auth) {
        setLoginStatus(false);
        setShowPopup(true);
      } else {
        setModalIsOpen(true);
        setLoginStatus(true);
        const { token, result } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(result));
        setTimeout(() => {
          navigate('/home');
          setModalIsOpen(false);
        }, 10000);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error.message);
      setShowPopup(true);
    }
  };

  const userauth = () => {
    axios
      .get('https://fback-vteb.onrender.com/isAuth', {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('An unexpected error occurred:', error.message);
      });
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <div>
      <Navbar />
      <div className='flex justify-center text-3xl translate-y-32 font-bold'>
        <p>User Login</p>
      </div>
      <div>
    </div>
    <div className='flex justify-end -ml-2'>
          {showPopup && (
            <Stack>
              <Alert severity="warning" onClose={() => setShowPopup(false)}>
                Error Invalid Credentials Check username and Password
              </Alert>
            </Stack>
          )}
        </div>
      <div className='flex justify-center items-center mt-60'>
        <div className='for w-96 h-96 flex flex-col justify-center items-center bg-black rounded-2xl'>
          <form>
            <div className='flex justify-center'>
              <TextField
                type='text'
                required
                error
                id="standard-required"
                label="Username"
                variant="standard"
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  style: { color: 'white' }
                }}
              />
            </div>
            <div className='flex justify-center mt-10'>
              <TextField
                required
                error
                id="standard-password-input"
                label="Password"
                autoComplete="current-password"
                variant="standard"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  style: { color: 'white' }
                }}
              />
            </div>
            <button
              type='button'
              className='font-semibold -translate-y-10 translate-x-44 text-white'
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
            <hr className='border-t border-transparent'></hr>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='text-white font-bold text-xl h-12 w-20 rounded-lg bg-red-500 hover:bg-red-400 hover:text-black'
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <p className='con text-white flex justify-center mt-5 gap-2 text-xl mb-2'>
              New user??<Link to='/signup' className='text-sky-400'>
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
      {loginStatus && <button onClick={userauth}>Check</button>}
    </div>
      <div className='foot mt-10'>
        <footer className="footer footer-center p-10 bg-black text-red-500 rounded">
          <nav className="fnav grid grid-flow-col gap-4">
            <Link to={'/about'} className="link link-hover hover:text-white text-xl">About</Link>
            <Link to={'/contact'} className="link link-hover hover:text-white text-xl">Contact</Link>
            <Link to={'/team'} className="link link-hover hover:text-white text-xl">Team</Link>
          </nav> 
          <nav>
            <div className="grid grid-flow-col gap-4">
              <a href="https://www.instagram.com/innum_vai/"><img className='cursor-pointer' src={insta} alt='insta'/></a>
              <a href='https://wa.me/9941269128'><img className='cursor-pointer' src={whatsapp} alt='insta'/></a>
              <a href='mailto:innumvai@gmail.com'><img className='cursor-pointer' src={mail} alt='insta'/></a>
            </div>
          </nav> 
          <aside>
            <p>Copyright © 2024 - All right reserved by Innumvai</p>
          </aside>
        </footer>
      </div>
      <div className='flex justify-center items-center'>
          <Modal
            isOpen={modalIsOpen}
            contentLabel="Registration Success Modal"
            ariaHideApp={false}
            className='flex justify-center items-center content-center h-screen w-screen fixed top-0 left-0'
            overlayClassName='fixed inset-0 bg-gray-500 bg-opacity-75'
          >
            <div className='lot flex justify-center items-center content-center h-96 w-96 bg-black p-4 rounded-md'>
              <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
                <div class="wheel"></div>
                <div class="hamster">
                  <div class="hamster__body">
                    <div class="hamster__head">
                      <div class="hamster__ear"></div>
                      <div class="hamster__eye"></div>
                      <div class="hamster__nose"></div>
                    </div>
                    <div class="hamster__limb hamster__limb--fr"></div>
                    <div class="hamster__limb hamster__limb--fl"></div>
                    <div class="hamster__limb hamster__limb--br"></div>
                    <div class="hamster__limb hamster__limb--bl"></div>
                    <div class="hamster__tail"></div>
                  </div>
                </div>
                <div class="spoke"></div>
              </div>
            </div>
          </Modal>
        </div>
    </Box>
    
  );
}