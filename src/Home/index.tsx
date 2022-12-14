import { useState, useEffect, useRef } from 'react';
import { Image, SafeAreaView, ScrollView, TextInput, View } from 'react-native';

import { Header } from '../components/Header';
import { Camera, CameraType } from 'expo-camera'
import { Button } from '../components/Button';
import { PositionChoice } from '../components/PositionChoice';

import { styles } from './styles';
import { POSITIONS, PositionProps } from '../utils/positions';

export function Home() {
  const [photo, setPhotoURI] = useState<null | string>(null)
  const [hasCameraPermission, setHasCameraPermission] = useState(false)
  const [positionSelected, setPositionSelected] = useState<PositionProps>(POSITIONS[0]);

  const cameraRef = useRef<Camera>(null)
  async function handleTakePicture() {
    const photo = await cameraRef.current.takePictureAsync()
    setPhotoURI(photo.uri)
  }

  useEffect(() => {
    Camera.requestCameraPermissionsAsync()
      .then(response => setHasCameraPermission(response.granted))
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View>
          <Header position={positionSelected} />

          <View style={styles.picture}>

            {
              hasCameraPermission && !photo ? 
                <Camera 
                  ref={cameraRef}
                  style={styles.camera}
                  type={CameraType.front}
                /> :
                <Image source={{ uri: photo ? photo : 'https://github.com/raphaelnb.png' }} style={styles.camera} />
            }
            <View style={styles.player}>
              <TextInput
                placeholder="Digite seu nome aqui"
                style={styles.name}
              />
            </View>
          </View>
        </View>

        <PositionChoice
          onChangePosition={setPositionSelected}
          positionSelected={positionSelected}
        />

        <Button title="Compartilhar"onPress={handleTakePicture} />
      </ScrollView>
    </SafeAreaView>
  );
}