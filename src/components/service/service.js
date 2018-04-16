import React, { Component } from 'react';
import { Container, Header, Content, Text, Title, Icon, View, CardItem
,Item ,Input } from 'native-base';

import { ListView , ActivityIndicator , StyleSheet } from 'react-native';
import Questionnaire from '../../components/questionnaire/questionnaire';

export default class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            selectedService : ""
        }

    }

    _handleNextPress(nextRoute) {
        this.props.navigator.push(nextRoute);
    }


    componentDidMount(){
        fetch("http://localhost:3001/api/service", { method: "GET" })
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson),
                }, function() {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    ListViewItemSeparator = () => {
        return (
            <Container
                style={{
                    height: .5,
                    width: "100%",
                }}
            />
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Container style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </Container>
            );
        }
        const nextRoute = {
            component: Questionnaire,
            title: 'Questionnaire',
            passProps: { myPropService: 'bar' }
        };
        return (
            <Container>
                <Header>
                    <Title>Services</Title>
                </Header>
                <Content>
                    <CardItem header>
                        <Text>Choose a Service</Text>
                    </CardItem>
                    <Item itemDivider>
                        <Icon name="ios-search" />
                        <Input placeholder="Search a Service" />
                    </Item>
                    <Item onSubmit={this._handleChange}>
                        <ListView dataSource={this.state.dataSource}
                                  renderSeparator= {this.ListViewItemSeparator}
                                  renderRow={(rowData) =>
                                      <View style={styles.container }>
                                      <Text style={styles.textViewContainerService} value={this.state.selectedService} onPress={() => this._handleNextPress(nextRoute)}> {rowData.name} </Text>
                                          <Text style={styles.textViewContainerDescription} onPress={() => this._handleNextPress(nextRoute)}> {rowData.description} </Text>
                                      </View>
                                  }
                        />
                    </Item>
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({

    container: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    textViewContainerService: {
        textAlignVertical:'center',
        padding:10,
        fontSize: 20,
    },
    textViewContainerDescription: {
        textAlignVertical:'center',
        fontSize: 15,
    }

});