import React, { Component } from 'react';
import { Container, Header, Content, Right, Text, Title, Icon, Button, Left,
    Card, CardItem, Input, Radio,Body,Item
} from 'native-base';
import {ListView , Alert , TextInput} from "react-native";

export default class Questionnaire extends Component {

    counter = 0;
    done = false;

    constructor(props) {
        super(props);
        this.setState({currentQuestion: 0, dataSource: {}, allQuestionsAnswered:false});
    }

    nextQuestion(){
        this.counter++;
        if (this.state.dataSource[this.counter])
            this.setState({currentQuestion : this.counter})
        else
            this.setState({allQuestionsAnswered : this.done = true})
    }
    componentDidMount()
    {
        fetch("http://localhost:3001/questionaire/Mobile-App-Development", { method: "GET" })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                    currentQuestion : this.counter,
                }, function() {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        return (this.state && this.state.dataSource &&
            <Container style={{alignItems:"center"}}>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Questionnaire</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>

                    {(this.state.dataSource[this.state.currentQuestion].options) ? (
                        <Card style={{padding:30}}>
                            <CardItem header style={{marginBottom:50}}>
                                <Text>{this.state.dataSource[this.state.currentQuestion].id}</Text>
                            </CardItem>
                            {this.state.dataSource[this.state.currentQuestion].options.map(option => (
                                <CardItem style={{margin:10}}>
                                    <Text>
                                        {option}
                                    </Text>
                                    <Right>
                                        <Radio/>
                                    </Right>
                                </CardItem>
                            ))}
                        </Card>
                    ) : (
                        <Card>
                            <CardItem header>
                                <Text>{this.state.dataSource[this.state.currentQuestion].id}</Text>
                            </CardItem>
                            <CardItem>
                            <Item rounded>
                                <Input placeholder='Enter Here.....'/>
                            </Item>
                            </CardItem>
                        </Card>
                    )
                    }
                    <Card>
                        <CardItem footer>
                            <Right>
                            <Button iconRight light onPress={()=>this.nextQuestion()} >
                                <Text>Next</Text>
                                <Icon name='arrow-forward' />
                            </Button>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}