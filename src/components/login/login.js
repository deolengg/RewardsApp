import React, { Component } from 'react';
import { Image, Linking, TouchableOpacity } from 'react-native';

import Service from '../../components/service/service';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Title, Card, CardItem } from 'native-base';
export default class Login extends Component {
    constructor(){
        super();
    }

    _handleNextPress(nextRoute) {
        this.props.navigator.push(nextRoute);
    }

    render() {
        const nextRoute = {
            component: Service,
            title: 'Service',
            //passProps: { myProp: 'bar' }
        };
        return (
            <Container>
                <Header>
                    <Title>Login</Title>
                </Header>
                <Content>
                    <Image source={require('../../components/images/linkdein.png' )} style={{height: 40, width: 292, alignSelf: "center",marginTop:30}} />

                    <Card style={{ alignItems: "center" ,alignSelf: "center", marginTop:30}}>





                        <TouchableOpacity style={{margin:10}} onPress={() => Linking.openURL('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78qzc7yyqxfn2j&redirect_uri=http://localhost:3001/login/linkedin&state=somestate')}>
                            <Image source={require('../../components/images/linkdein.png' )} style={{height: 40, width: 292}} />
                        </TouchableOpacity>
                    <TouchableOpacity style={{margin:10}} onPress={() => Linking.openURL('https://www.facebook.com/dialog/oauth?scope=email&app_id=177624063043650&redirect_uri=http://localhost:3001/login/facebook')}>
                        <Image source={require('../../components/images/facebook.png' )} style={{height: 40, width: 292}} />
                    </TouchableOpacity>
                    </Card>
                </Content>
            </Container>
        );
    }
}