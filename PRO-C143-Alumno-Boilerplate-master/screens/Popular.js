import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  Text,
} from "react-native";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";
import Star from 'react-native-star-view';

export default class PopularMoviesScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:[],
      ngrok:'https://04fc-177-247-100-114.ngrok-free.app'
    }
  }
  ponentDidMount(){
    this.getData()
  }
  getData=()=>{
    const url= this.state.ngrok+"/popular_movies"
    axios.get(url)
    .then(async(response)=>{
     this.setState({data:response.data.data})
    })
    .catch((error)=>{console.log(error.message)})
  }
  keyExtractor=(item,index)=> index.toString()
  renderItem=({item,index})=> {
  return (
    <View style={styles.container}>
      <Image
        source={{uri:item.poster_linkt}}
        style={styles.posterImage}
      >   
      </Image>
      <View style={styles.movieTitleContainer}>
        <Text style={styles.title}>
          {item.original_title}
        </Text>
        <View style={{flexDirection:"row"}}>
        <Text style={styles.subtitle}>
          {item.duration}
        </Text>
        <Star style={styles.starStyle} score={item.rating}>
        </Star>
      </View>
      </View>
    </View>
  );
  }
  render() {
    const {data}=this.state
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/bg.png")}
          style={{ flex: 1 }}
        >
         <FlatList data={data} keyExtractor={this.keyExtractor} renderItem={this.renderItem}> 
        </FlatList> 
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardContainer: {
    borderRadius: RFValue(10),
    height: RFValue(200),
    marginHorizontal: RFValue(20),
    marginVertical: RFValue(15),
  },
  posterImage: {
    flex: 1,
    borderRadius: RFValue(10),
  },
  title: {
    fontSize: RFValue(15),
    fontWeight: "bold",
    color: "#3c8ed9",
    fontFamily: "monospace",
    marginVertical: RFValue(2),
  },
  subtitle: {
    fontSize: RFValue(10),
    fontWeight: "bold",
    color: "#3c8ed9",
    fontFamily: "monospace",
    marginVertical: RFValue(2),
  },
  movieTitleContainer: {
    position: "absolute",
    backgroundColor: "white",
    width:RFValue(250),
    padding: RFValue(10),
    bottom: RFValue(10),
    left: RFValue(10),
    borderRadius: RFValue(10),
    borderWidth:RFValue(2),
    borderColor:"#3c8ed9"
  },
  starStyle: {
    width: RFValue(75),
    height: RFValue(15),
  }
});
