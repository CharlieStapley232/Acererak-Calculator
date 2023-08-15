import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useCallback, useEffect } from 'react';

import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView, TextInput } from 'react-native';

export default function App() {
  const [ventures, setVentures] = useState(''); // * sets the 'ventures' variable and its setter.
  const [endRoom, setEndRoom] = useState('no change'); // * sets the 'endRoom' variable and its setter.

  // * the following lines sets an individual room variable.
  const [room1, setRoom1] = useState({ val: 0 });
  const [room2, setRoom2] = useState({ val: 0 });
  const [room3, setRoom3] = useState({ val: 0 });
  const [room4, setRoom4] = useState({ val: 0 });
  const [room5, setRoom5] = useState({ val: 0 });
  const [room6, setRoom6] = useState({ val: 0 });
  const [room7, setRoom7] = useState({ val: 0 });
  const setRoomList = [
    setRoom1,
    setRoom2,
    setRoom3,
    setRoom4,
    setRoom5,
    setRoom6,
    setRoom7,
  ]; // * setRoomList defines the rooms that can be looped over in later portions.

  const [dungeonsOpen, setDungeonsOpen] = useState(false); // * used in dropdown to define the state as closed.
  const [dungeon, setDungeon] = useState('mine'); // * used in dungeon dropdown to define the default value.
  const [dungeons, setDungeons] = useState([
    { label: 'Lost Mine of Phandelver', value: 'mine' },
    { label: 'Dungeon of the Mad Mage', value: 'mage' },
    { label: 'Undercity', value: 'undercity' },
  ]); // * used in dungeon dropdown to define the selectable options and their respective variables.

  const [room, setRoom] = useState('0'); // * used to define the room you are in.

  const [roomsOpen, setRoomsOpen] = useState(false); // * used in dropdown to define the state as closed.
  // * the following roomsX variables define how many rooms should appear in the dropdown dependant on the dungeon selected.
  const rooms1 = [
    { label: 'Not Ventured', value: '0' },
    { label: 'Room 1', value: '1' },
    { label: 'Room 2', value: '2' },
    { label: 'Room 3', value: '3' },
    { label: 'Room 4', value: '4' },
  ];
  const rooms2 = [
    { label: 'Not Ventured', value: '0' },
    { label: 'Room 1', value: '1' },
    { label: 'Room 2', value: '2' },
    { label: 'Room 3', value: '3' },
    { label: 'Room 4', value: '4' },
    { label: 'Room 5', value: '5' },
    { label: 'Room 6', value: '6' },
    { label: 'Room 7', value: '7' },
  ];
  const rooms3 = [
    { label: 'Not Ventured', value: '0' },
    { label: 'Room 1', value: '1' },
    { label: 'Room 2', value: '2' },
    { label: 'Room 3', value: '3' },
    { label: 'Room 4', value: '4' },
    { label: 'Room 5', value: '5' },
  ];
  const [rooms, setRooms] = useState(rooms1); // * used in dungeon dropdown to define the default value.

  const onRoomsOpen = useCallback(() => {
    setDungeonsOpen(false);
  }, []); // * this function closes the other dropdown to ensure only one dropdown is active at a time.

  const onDungeonsOpen = useCallback(() => {
    setRoomsOpen(false);
  }, []); // * this function closes the other dropdown to ensure only one dropdown is active at a time.

  // * the below function changes the rooms that are present in the rooms dropdown when the dungeon is changed.
  const onValueChange = (value) => {
    if (value === 'mine') {
      setRooms(rooms1);
      setRoom('0');
    } else if (value === 'mage') {
      setRooms(rooms2);
      setRoom('0');
    } else if (value === 'undercity') {
      setRooms(rooms3);
      setRoom('0');
    }
    calculateVentures(); // * calls the calculateVentures function to calculate the ventures.
  };

  useEffect(() => {
    calculateVentures();
  }, [ventures]); // * calls the calculateVentures function to calculate the ventures whenver a change in the input of ventures is detected.

  const calculateVentures = () => {
    const calc_dungeon = dungeon ? dungeon : 'mine'; // * sets the calc_dungeon variable to the dungeon selected, if there is no dungeon it defaults to Lost Mine of Phandelver.
    const calc_ventures = isNum(ventures) ? ventures : 0; // * sets calc_ventures to the number of ventures, if there is no number present or the value given is not a number it defaults to 0.
    const calc_room = room ? room : 0; // * sets calc_room to the room you have selected, if no room is selected it defaults to 0.
    if (calc_dungeon === 'mine') {
      // * if the dungeon is set to Lost Mine of Phandelver:
      const dungeon_len = 4; // * the dungeon length is set to 4 (rooms).
      const add_to_all = Math.floor(calc_ventures / dungeon_len); // * this calculates the amount of ventures to add to all the rooms, for example if you venture 8 times, as the dungeon is only 4 rooms long you will have gone through each room twice.
      const calc_modulo = parseInt(calc_ventures % dungeon_len); // * this calcs the remainder of ventures.
      for (var i = 0; i < dungeon_len; i++) {
        setRoomList[i]({ val: add_to_all }); // * goes through each room and sets it to the amount in add_to_all.
      }
      for (var i = calc_room; i < calc_modulo + parseInt(calc_room); i++) {
        // * in this for loop, the index starts at the room number you started in, in order to skip that room (as you are already in it, venturing does not trigger that room).
        var index = i;
        if (index >= dungeon_len) {
          // * if the index is greater than the dungeon length:
          index = 0 + index - dungeon_len; // * the index will go back to the beginning.
        }
        setRoomList[index]((prevVal) => ({ val: prevVal.val + 1 })); // * adds one venture to the room.
      }
      if (calc_modulo != 0) {
        // * if you don't complete a full cycle.
        setEndRoom(`move up ${calc_modulo} rooms`); // * sets the room you will end up in to the remainder.
      } else {
        setEndRoom('no change');
      }
    } else if (calc_dungeon === 'mage') {
      const dungeon_len = 7;
      const add_to_all = Math.floor(calc_ventures / dungeon_len);
      const calc_modulo = parseInt(calc_ventures % dungeon_len);
      for (var i = 0; i < dungeon_len; i++) {
        setRoomList[i]({ val: add_to_all });
      }
      for (var i = calc_room; i < calc_modulo + parseInt(calc_room); i++) {
        var index = i;
        if (index >= dungeon_len) {
          index = 0 + index - dungeon_len;
        }
        setRoomList[index]((prevVal) => ({ val: prevVal.val + 1 }));
      }
      if (calc_modulo != 0) {
        setEndRoom(`move up ${calc_modulo} rooms`);
      } else {
        setEndRoom('no change');
      }
    } else if (calc_dungeon === 'undercity') {
      const dungeon_len = 5;
      const add_to_all = Math.floor(calc_ventures / dungeon_len);
      const calc_modulo = parseInt(calc_ventures % dungeon_len);
      for (var i = 0; i < dungeon_len; i++) {
        setRoomList[i]({ val: add_to_all });
      }
      for (var i = calc_room; i < calc_modulo + parseInt(calc_room); i++) {
        var index = i;
        if (index >= dungeon_len) {
          index = 0 + index - dungeon_len;
        }
        setRoomList[index]((prevVal) => ({ val: prevVal.val + 1 }));
      }
      if (calc_modulo != 0) {
        setEndRoom(`move up ${calc_modulo} rooms`);
      } else {
        setEndRoom('no change');
      }
    }
  };

  // * the following function checks to see if the value provided is a number.
  const isNum = (value) => {
    try {
      const x = parseInt(value); // * first it parses the value into an integer, if this fails the catch block will be executed.
      if (isNaN(x)) {
        // * if the number is not a number (NaN).
        return false;
      } else if (x <= 0) {
        // * if the number is negative.
        return false;
      } else {
        // * the value provided is a number!
        return true;
      }
    } catch {
      return false;
    }
  };

  // * below is the display logic for the app.
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginEnd: 100 }}>dungeon:</Text>
          <Text>room no:</Text>
        </View>
        <View style={{ flexDirection: 'row', zIndex: 1 }}>
          <DropDownPicker
            onChangeValue={onValueChange}
            containerStyle={{ width: 150 }}
            open={dungeonsOpen}
            onOpen={onDungeonsOpen}
            value={dungeon}
            items={dungeons}
            setOpen={setDungeonsOpen}
            setValue={setDungeon}
            setItems={setDungeons}
          />
          <DropDownPicker
            onChangeValue={onValueChange}
            containerStyle={{ width: 150 }}
            open={roomsOpen}
            onOpen={onRoomsOpen}
            value={room}
            items={rooms}
            setOpen={setRoomsOpen}
            setValue={setRoom}
            setItems={setRooms}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginTop: 23 }}>ventures: </Text>
          <TextInput
            style={styles.input}
            onChangeText={setVentures}
            value={ventures}
            placeholder='amount of ventures'
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text}>Room 1:</Text>
          <Text style={styles.box}>{room1.val}</Text>
          <Text style={styles.text}>Room 5:</Text>
          <Text style={styles.box}>{room5.val}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text}>Room 2:</Text>
          <Text style={styles.box}>{room2.val}</Text>
          <Text style={styles.text}>Room 6:</Text>
          <Text style={styles.box}>{room6.val}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text}>Room 3:</Text>
          <Text style={styles.box}>{room3.val}</Text>
          <Text style={styles.text}>Room 7:</Text>
          <Text style={styles.box}>{room7.val}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text}>Room 4:</Text>
          <Text style={styles.box}>{room4.val}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text style={styles.text}>End room:</Text>
          <Text style={styles.box}>{endRoom}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

// * below is the style of the app.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderRadius: 5,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  box: {
    borderRadius: 5,
    height: 28,
    borderWidth: 1,
    margin: 5,
    padding: 5,
  },
  text: {
    marginTop: 10,
  },
});
