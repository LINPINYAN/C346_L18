import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View, Image} from 'react-native';

//Exercise 1C - create originalData
let originalData = [];


const App = () => {
    const [myData, setMyData] = useState([]);

    //Add useEffect = Exercise 1B
    useEffect(() => {
        //Add fetch() = Exercise 1A
        const myurl = "https://r1999charawebservice.onrender.com/allcharacters"
        fetch (myurl)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                setMyData(myJson);
                originalData = myJson;
            })
    },[]);

    //Added filterData - Exercise 1C
    const FilterData = (text) => {
        if(text!=''){
            let myFilteredData = originalData.filter((item) =>
                item.chara_name.toLowerCase().includes(text.toLowerCase()));
            setMyData(myFilteredData);
        }
        else {
            setMyData(originalData);
        }
    }


    const renderItem = ({item, index}) => {
        return (
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center', borderWidth:1, backgroundColor:"powderblue"}} >
                <Text style={{fontSize: 20, backgroundColor:'powderblue', color:'navy'}}>{item.chara_name}</Text>
                <Image source ={{uri: item.chara_pic}}
                       style={{ width: 155, height: 270 , justifyContent: "center", borderWidth:4, borderColor:"mistyrose", borderRadius:70, backgroundColor:'black'}} />
            </View>
        );
    };

    return (
        <View>
            <StatusBar/>
            <Text style={{fontSize:20}}>Search:</Text>
            <TextInput style={{borderWidth:1}} onChangeText={(text)=>{FilterData(text)}}/>
            <FlatList data={myData} renderItem={renderItem} />
        </View>
    );
}

export default App;
//yay oh no