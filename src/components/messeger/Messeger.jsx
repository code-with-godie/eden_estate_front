import styled from 'styled-components';
import Rooms from './Rooms';
import Chats from './Chats';
import { useAppContext } from '../../context/AppContextProvider';
import { appwriteService } from '../../appWrite/appwriteService';
import { appwriteConfig } from '../../appWrite/appConfig';
import { useCallback, useEffect } from 'react';
const Container = styled.div`
  height: 88vh;
  position: sticky;
  top: 50px;
  overflow: hidden;
`;
const Messeger = () => {
  const { conversation, user, setChats } = useAppContext();

  const realTime = useCallback(() => {
    try {
      return appwriteService.client.subscribe(
        `databases.${appwriteConfig.appWriteDatabase}.collections.${appwriteConfig.appWriteMessegesCollectionID}.documents`,
        response => {
          if (
            response.events.includes(
              'databases.*.collections.*.documents.*.create'
            )
          ) {
            const { payload } = response;
            //handle other user chats
            if (
              payload?.room?.$id === conversation?.roomID &&
              payload.receiver === user?._id
            ) {
              setChats(prev => [...prev, payload]);
            }
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, [user, conversation, setChats]);
  useEffect(() => {
    const unsubscribe = realTime();
    return () => {
      unsubscribe();
    };
  }, [realTime]);
  return (
    <Container>
      <Rooms />
      {conversation && <Chats />}
    </Container>
  );
};

export default Messeger;
