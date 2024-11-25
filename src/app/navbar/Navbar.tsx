import { Link } from 'react-router-dom';
import { NavbarIcon } from './NavbarIcon/NavbarIcon';
import styles from './Navbar.module.css';
import Logo from '@/assets/image/Sapo-logo.png';

export function Navbar() {

  return (
    <div id='Navbar' >
      {/* left */}
      <div className='flex justify-around text-center' >

        <NavbarIcon
          href="https://www.instagram.com/"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="35"
              height="25"
              className={`mx-2 ${styles.profileLink}`}>
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
          }
        />

        <NavbarIcon
          href="https://www.facebook.com/login.php?skip_api_login=1&api_key=344190606773871&kid_directed_site=0&app_id=344190606773871&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv19.0%2Fdialog%2Foauth%3Fclient_id%3D344190606773871%26redirect_uri%3Dhttps%253A%252F%252Fauthenticate.riotgames.com%252Fredirects%252Ffacebook%26state%3De02a67f5b20678350e77c5b07a55057d7cf132d5f5205362ca9163343fb9%26scope%3Demail%26ret%3Dlogin%26fbapp_pres%3D0%26logger_id%3D1a39bb91-1cff-4803-b322-719a42fa3808%26tp%3Dunspecified&cancel_url=https%3A%2F%2Fauthenticate.riotgames.com%2Fredirects%2Ffacebook%3Ferror%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied%26state%3De02a67f5b20678350e77c5b07a55057d7cf132d5f5205362ca9163343fb9%23_%3D_&display=page&locale=vi_VN&pl_dbl=0"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="35"
              height="25"
              className={`mx-2 ${styles.profileLink}`}>
              <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
            </svg>
          }
        />
        <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
        <NavbarIcon
          href="https://www.youtube.com/"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="35"
              height="25"
              >

              <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
            </svg>
          }
        />

        <Link to="/" className={`mx-2 ${styles.profileLink}`}>About us</Link>


        <Link to="/" className={`mx-2 ${styles.profileLink}`}>Shop</Link>


      </div>

      {/* center */}
      <div className='flex'>

        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <img src={Logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
        </Link>

      </div>

      {/* right */}
      <div className='flex'>


        <Link to="/profile" className={`mx-2 ${styles.profileLink}`} >Profile</Link>

        <Link to="/" className={`mx-2 ${styles.profileLink}`} >Search</Link>

        <Link to="/auth/login" className={`mx-2 ${styles.profileLink}`} >Sign In</Link>


        <NavbarIcon
          to='/'
          icon={
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="35"
              height="25"
              className={`mx-2 ${styles.profileLink}`}>
              <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
            </svg>
          } />

        <NavbarIcon
          to='/'
          icon={
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="35"
              height="25"
              className={`mx-2 ${styles.profileLink}`}>
              <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
            </svg>
          } />

      </div>
    </div>

  );
}
