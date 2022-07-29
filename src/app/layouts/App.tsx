import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import theme from '../theme/theme'
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@mui/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
// import Home from "../../features/Home/Home";
import ContactPage from "../../features/ContactPage/ContactPage";
import AboutPage from "../../features/AboutPage/AboutPage";
import Catalog from "../../features/Products/Catalog";
import CheckoutPage from '../../features/CheckoutPage/CheckoutPage'
import ProductDetail from "../../features/ProductDetail/ProductDetail";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ServerErrorComponent from "../../error/ServerErrorComponent";
import NotFoundComponent from "../../error/NotFoundComponent";
import BasketPage from "../../features/BasketPage/BasketPage";
import { useStoreContext } from "../../context/StoreContext";
import getCookie from "../../Helpers/getCookie";
import agent from "../api/agent";
import LoadingComponents from "./LoadingComponents";

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

// Configure JSS
const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setBasket } = useStoreContext();
  useEffect(() => {
    const cookie = getCookie('buyerId')
    if (cookie) {
      agent.basket.allItems().then(result =>
        setBasket(result)).catch(error =>
          console.log(error))
        .finally(() => setLoading(false))
    }
  }, [setBasket])
  // Change dark mode
  const changeDarkMode = () => {
    setDarkMode(!darkMode);
  }
  const theme2 = createTheme({
    ...theme,
    palette: {
      mode: darkMode ? 'dark' : 'light'
    }
  })
  // if (loading) return <LoadingComponents message="در حال بارگزاری ..." />
  return (
    <ThemeProvider theme={theme2}>
      <ToastContainer autoClose={4000} position={toast.POSITION.TOP_RIGHT} hideProgressBar
        rtl closeButton={false} theme="colored" />
      <CacheProvider value={cacheRtl}>
        <StylesProvider jss={jss}>
          <CssBaseline />
          <div className="App">
            <Header darkMode={darkMode} changeDarkMode={changeDarkMode} />
            <Container>
              <Routes >
                <Route path="/" element={<Catalog />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/contactus" element={<ContactPage />} />
                <Route path="/aboutus" element={<AboutPage />} />
                <Route path="/server-error" element={<ServerErrorComponent />} />
                <Route path="/basket" element={<BasketPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="*" element={<NotFoundComponent />} />
              </Routes>
            </Container>
          </div>
        </StylesProvider>
      </CacheProvider>
    </ThemeProvider >
  );
}

export default App;
