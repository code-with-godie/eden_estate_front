// CloudinaryUpload.js
import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContextProvider';
import styled from 'styled-components';
import { Bounce, toast } from 'react-toastify';

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  padding: 0.5rem;
  height: 200px;

  @media screen and (max-width: 768px) {
    height: 120px;
    position: sticky;
    top: 0;
  }
`;
const Container = styled.div`
  padding: 0.5rem;
  flex: 1;
  border: 1px dotted gray;
  height: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  background-color: #80808015;
  cursor: pointer;
  :hover {
    background-color: #80808043;
  }
`;
const Description = styled.p`
  font-size: 0.9rem;
  color: gray;
`;
const CloudinaryUpload = ({ rooms, setImage }) => {
  const widgetRef = useRef(null);
  const { darkMode } = useAppContext();

  useEffect(() => {
    // Load the Cloudinary widget script
    const script = document.createElement('script');
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    script.async = true;
    script.onload = () => {
      // Initialize the Cloudinary widget
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: 'dmxqjeidz',
          uploadPreset: `${
            rooms ? 'eden_rooms_upload' : 'eden_estates_presets'
          }`,
          sources: [
            'local',
            'url',
            'camera',
            'image_search',
            'google_drive',
            'facebook',
            'dropbox',
            'instagram',
            'shutterstock',
          ],
          googleApiKey: '<image_search_google_api_key>',
          showAdvancedOptions: true,
          cropping: true,
          maxFileSize: 9000000,
          multiple: false,
          defaultSource: 'local',
          styles: {
            palette: darkMode
              ? {
                  window: '#1E1E1E',
                  windowBorder: '#333333',
                  tabIcon: '#FFFFFF',
                  menuIcons: '#FFFFFF',
                  textDark: '#FFFFFF',
                  textLight: '#000000',
                  link: '#1EA7FD',
                  action: '#FF620C',
                  inactiveTabIcon: '#FFFFFF',
                  error: '#F44235',
                  inProgress: '#0078FF',
                  complete: '#20B832',
                  sourceBg: '#333333',
                }
              : {
                  window: '#FFFFFF',
                  windowBorder: '#90A0B3',
                  tabIcon: '#0078FF',
                  menuIcons: '#5A616A',
                  textDark: '#000000',
                  textLight: '#FFFFFF',
                  link: '#1EA7FD',
                  action: '#FF620C',
                  inactiveTabIcon: '#0E2F5A',
                  error: '#F44235',
                  inProgress: '#0078FF',
                  complete: '#20B832',
                  sourceBg: '#E4EBF1',
                },
            fonts: {
              default: null,
              "'Fira Sans', sans-serif": {
                url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
                active: true,
              },
            },
          },
        },
        (error, result) => {
          if (error) {
            return toast.error(`${error?.message} 😟😟`, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: `${darkMode ? 'dark' : 'light'}`,
              transition: Bounce,
            });
          }
          if (result && result.event !== 'success') {
            return;
          }
          const { secure_url, public_id } = result?.info;
          setImage({ secure_url, public_id });
        }
      );
    };
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, [darkMode, rooms]);

  const openWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    }
  };

  return (
    <Wrapper>
      <Container onClick={openWidget}>
        <Description>
          click to select {rooms ? 'room image' : 'estate image'}{' '}
        </Description>
      </Container>
    </Wrapper>
  );
};

export default CloudinaryUpload;
