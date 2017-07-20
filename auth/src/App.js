import React, {Component} from 'react';
import {View} from 'react-native';
import firebase from 'firebase'
import {Header, Button, Spinner, Card, CardSection} from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

    state = {loggedIn: null};

    componentWillMount() {
        firebase.initializeApp(
            {
                apiKey: 'AIzaSyCgLAZpBPmi2DvqzHoXv962iA9eTX5YLr0',
                authDomain: 'auth-c5e0e.firebaseapp.com',
                databaseURL: 'https://auth-c5e0e.firebaseio.com',
                projectId: 'auth-c5e0e',
                storageBucket: 'auth-c5e0e.appspot.com',
                messagingSenderId: '971264458529'
            });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({loggedIn: true});
            } else {
                this.setState({loggedIn: false});
            }
        });

    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Card>
                        <CardSection>
                            <Button onPress={() => firebase.auth().signOut()}>
                                Log Out
                            </Button>
                        </CardSection>
                    </Card>
                );
            case false:
                return (<LoginForm/>);
            default:
                return (<Spinner size="large"/>);
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication"/>
                {this.renderContent()}
            </View>
        );
    }
}

export default App;