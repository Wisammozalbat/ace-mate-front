//This component shows the user data in the matching cards section, letting other
//users see the profile data of each user that appears to them

import React, {useState, useEffect} from 'react';
import { View, Modal, Text, Image, ScrollView, TouchableWithoutFeedback, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors';

const {width, height} = Dimensions.get('window')

export const ProfileModal = (props) => {

    const { profile, visible = false, onClose } = props
    const [currentIndex, setCurrentIndex] = useState(0)
    useEffect(()=>{
        setCurrentIndex(last => 0)
    }, [profile])

    const profLength = profile.photos ? profile.photos.length : 0;
    const userPhotos = profile.photos ? [...profile.photos] : null

    //If the user doesn't have any photos, it will be displayed the default photo
    let topPart = (
        userPhotos ? 
        userPhotos.map((photo, i) => {
            return (<View style={{
                        width:`${100/userPhotos.length}%`, 
                        height: 5, 
                        paddingHorizontal: 5,
                        alignSelf: 'center'
                        }}
                        key={photo + profile.user + i}>
                        <View style={{ ...styles.topBar, backgroundColor: i === currentIndex ? 'white': styles.topBar.backgroundColor}}></View>
                    </View>
                )
            }
        ) : (
            <View style={{
                width: '100%', 
                height: 5, 
                paddingHorizontal: 5,
                alignSelf: 'center'
                }}>
                <View style={{backgroundColor: 'white', flex: 1}}></View>
            </View>
        )
    )

    return (
        <Modal 
            visible={visible}
            style={styles.modal}
            onRequestClose={onClose}
        >
            <ScrollView
                style={styles.scrollView}
            >
                {/*Here are shown all the images of the user, one by once by clicking left or rigth*/}
                <View style={{width: width, height: height*0.6, 
                    overflow: 'hidden', zIndex: 90,
                    flexDirection: 'row'}}>
                    <Image
                        resizeMode='cover'
                        style={{...styles.image}}
                        source={userPhotos ? {uri: userPhotos[currentIndex]}: require('../assets/default-user.png')}
                        />
                    <TouchableOpacity 
                        style={{...styles.changePhotoContainer, left: 0}}
                        disabled={currentIndex === 0 ? true : false}
                        onPress={()=> setCurrentIndex(prevIndex=> prevIndex - 1)}
                        >
                        <View style={{...styles.changePhoto}}>
                            <Ionicons 
                                name='ios-arrow-back' 
                                size={50} 
                                color={currentIndex === 0 ? 'grey': 'white'}
                                />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{...styles.changePhotoContainer, right: 0}}
                        disabled={currentIndex === (profLength - 1) ? true : false}
                        onPress={()=> setCurrentIndex(prevIndex=> prevIndex + 1)}
                        >
                        <View style={{...styles.changePhoto, alignItems: 'flex-end'}}>
                            <Ionicons 
                                name='ios-arrow-forward' 
                                size={50} 
                                color={currentIndex === (profLength - 1) ? 'grey': 'white'}
                                />
                        </View>
                    </TouchableOpacity>
                    <View style={{...styles.photoRollIndicator, flexDirection: 'row'}}>
                        {topPart}
                    </View>
                </View>
                {/*Here goes the profile data*/}
                <View style={styles.infoContainer}>
                    <Text style={{fontSize: 40}}>{profile.name}, {profile.age}</Text>
                    <Text style={styles.label}>Gender: 
                        <Text style={{...styles.text, textTransform: 'capitalize'}}> {profile.gender}</Text>
                    </Text>
                    <Text style={styles.label}>Lookinig for: 
                        {profile.lookingFor ? 
                            <Text style={styles.text}> {profile.lookingFor.join(', ')}</Text>
                            : <Text style={styles.text}> No info provided</Text> }
                    </Text>
                    <Text style={styles.label}>About Me: 
                        {profile.aboutMe ? 
                            <Text style={styles.text}> {profile.aboutMe}</Text>
                            : <Text style={styles.text}>No info provided</Text>}
                    </Text>
                    <Text style={styles.label}>Profession:
                        {profile.profession ?
                            <Text style={styles.text}> {profile.profession}</Text>
                            : <Text style={styles.text}>No info provided</Text>}
                    </Text>
                    <Text style={styles.label}>Height:
                        {profile.height ?
                            <Text style={styles.text}> {profile.height}m</Text>
                            : <Text style={styles.text}>No info provided</Text>}
                    </Text>
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={onClose}
                style={styles.closeButton}
            >
                <Ionicons name='md-close' size={30} color='white'/>
            </TouchableOpacity>
        </Modal>
    )


}

const styles = StyleSheet.create({
    modal: {
        width: width,
        height: height
    },
    scrollView: {
        flex: 1,
        flexWrap: 'wrap'
    },
    closeButton:{
        position: 'absolute',
        top: 25,
        right: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.headerColor,
        zIndex: 200
    },
    label: {
        fontWeight: 'bold',
        fontSize: 15,
        marginVertical: 3,
        fontSize: 17
    },
    text: {
        fontWeight: '100'
    },
    changePhotoContainer: {
        width: '50%', height: '95%',
        zIndex: 100,
        position: 'absolute',
        top: '5%',
        padding: 30,
        justifyContent: 'center'
    },
    changePhoto: {
        flex: 1,
        justifyContent: 'center'
    },
    photoRollIndicator:{
        position: 'absolute',
        top: 0,
        width: width,
        height: '5%',
        justifyContent: 'center',
        paddingHorizontal: 10

    },
    image: {
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    topBar:{
        backgroundColor: '#919191',
        flex: 1, 
        borderRadius: 2
    },
    infoContainer: {
        width: width,
        paddingHorizontal: 20,
    }
})