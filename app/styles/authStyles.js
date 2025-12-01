import { StyleSheet } from 'react-native'
export const authStyles = StyleSheet.create({
    appContainer:{
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3C3C3C'
    },
    containerFields: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    fields: {
        width: 300,
        height: 40,
        backgroundColor: '#E5E5E5',
        borderColor: '#9A9A9A',
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 15,
        paddingLeft: 10
    },
    fieldsName: {
        fontSize: 16,
        fontFamily: 'Poppins-Light',
        color: '#E5E5E5',
        marginStart: 5
    },
    authSubmitButton: {
        width: 195,
        height: 50,
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
        borderWidth: 1,
        borderColor: '#9A9A9A',
        borderRadius: 15,
    },
    authSubmitButtonText: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        color: '#535353'
    },
    authAskTextContainer:{
        flexDirection: 'row',
        marginTop: 5
    },
    mainAskText:{
        fontSize: 13,
        fontFamily: 'Poppins-Light',
        color: '#9A9A9A'
    },
    buttonAskText:{
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        color: '#E5E5E5'
    }
})
