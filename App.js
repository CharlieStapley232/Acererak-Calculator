import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, TextInput } from 'react-native';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DropDownPicker from 'react-native-dropdown-picker';

export default function App() {
  const [ventures, setVentures] = useState(''); // * sets the 'ventures' variable and its setter.
  const [endRoom, setEndRoom] = useState('no change'); // * sets the 'endRoom' variable and its setter.
  const [colourlessCost, setColourlessCost] = useState(''); // * as above...
  const [colouredCost, setColouredCost] = useState(''); // * so below
  const [colouredOpen, setColouredOpen] = useState('');
  const [colourlessOpen, setColourlessOpen] = useState('');
  const [availableCasts, setAvailableCasts] = useState(0);
  const [ventureCost, setVentureCost] = useState(0);
  const [cost, setCost] = useState('black mana');
  const [available, setAvailable] = useState('black open');

  const [useLife, setUseLife] = useState(false); // * set the checkbox state and its setter.

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
    { label: 'Not Ventured', value: 0 },
    { label: 'Room 1', value: 1 },
    { label: 'Room 2', value: 2 },
    { label: 'Room 3', value: 3 },
    { label: 'Room 4', value: 4 },
  ];
  const rooms2 = [
    { label: 'Not Ventured', value: 0 },
    { label: 'Room 1', value: 1 },
    { label: 'Room 2', value: 2 },
    { label: 'Room 3', value: 3 },
    { label: 'Room 4', value: 4 },
    { label: 'Room 5', value: 5 },
    { label: 'Room 6', value: 6 },
    { label: 'Room 7', value: 7 },
  ];
  const rooms3 = [
    { label: 'Not Ventured', value: 0 },
    { label: 'Room 1', value: 1 },
    { label: 'Room 2', value: 2 },
    { label: 'Room 3', value: 3 },
    { label: 'Room 4', value: 4 },
    { label: 'Room 5', value: 5 },
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
      if (room > 4) {
        // * checks if the room selected is more than the mine itself has, if so reset it to not ventured.
        setRoom('0');
      }
    } else if (value === 'mage') {
      setRooms(rooms2);
      if (room > 7) {
        setRoom('0');
      }
    } else if (value === 'undercity') {
      setRooms(rooms3);
      if (room > 5) {
        setRoom('0');
      }
    }
    calculateVentures(); // * calls the calculateVentures function to calculate the ventures.
  };

  useEffect(() => {
    calculateVentures();
    calculateVentureCost();
  }, [ventures]); // * calls the calculateVentures & calculateVentureCost function to calculate the ventures and venture cost whenever a change in the input of ventures is detected.

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

  useEffect(() => {
    if (useLife) {
      // * if the box is checked, then the placeholder text will be replaced with life.
      setCost('life');
      setAvailable('life open');
    } else {
      // * else the placeholder text will be replaced with black mana.
      setCost('black mana');
      setAvailable('black open');
    }
  }, [useLife]);

  useEffect(() => {
    calculateAvailableCasts();
    calculateVentureCost();
  }, [colouredCost, colouredOpen, colourlessCost, colourlessOpen]); // * calls the calculateAvailableCasts & calculateVentureCost function to calculate the available casts and venture cost whenever a change in the input of the costs/availables are detected.

  const calculateAvailableCasts = () => {
    // * the below sets the costs and available for each type of mana, if there is no number present or the value given is not a number it defaults to 0.
    const calc_colourless_cost = parseInt(
      isNum(colourlessCost) ? colourlessCost : 0
    );
    const calc_coloured_cost = parseInt(isNum(colouredCost) ? colouredCost : 0);
    const calc_colourless_avail = parseInt(
      isNum(colourlessOpen) ? colourlessOpen : 0
    );
    const calc_coloured_avail = parseInt(
      isNum(colouredOpen) ? colouredOpen : 0
    );

    const total_cost = calc_colourless_cost + calc_coloured_cost; // * the total cost of all the casts of acererak.
    const total_mana = calc_colourless_avail + calc_coloured_avail; // * the total mana available.
    const available_casts = Math.min(
      Math.floor(total_mana / total_cost),
      Math.floor(calc_coloured_avail / calc_coloured_cost)
    ); // * this function finds the lowest of two numbers: the total amount of times acererak can be cast using any mana, and the total amount of times acererak can be cast with the restriction that either black mana or life must be paid.
    setAvailableCasts(available_casts ? available_casts : 0); // * sets the available cast to the above number, if it is NaN it is defaulted to 0.
  };

  const calculateVentureCost = () => {
    const calc_ventures = isNum(ventures) ? ventures : 0;
    const calc_colourless_cost = parseInt(
      isNum(colourlessCost) ? colourlessCost : 0
    );
    const calc_coloured_cost = parseInt(isNum(colouredCost) ? colouredCost : 0);
    if (useLife) {
      // * if using life.
      setVentureCost(
        `c: ${calc_colourless_cost * calc_ventures} l: ${
          calc_coloured_cost * calc_ventures
        } `
      ); // * set the cost for the amount of ventures for both colourless mana and life.
    } else {
      // * if not using life.
      setVentureCost(
        `c: ${calc_colourless_cost * calc_ventures} b: ${
          calc_coloured_cost * calc_ventures
        } `
      ); // * set the cost for the amount of ventures for both colourless and black mana.
    }
  };

  // * below is the display logic for the app.
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={{ marginStart: 77, marginBottom: 10 }}>
          ------- casts: -------
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginTop: 12, marginEnd: 10 }}>cost:</Text>
          <TextInput
            style={styles.miniput}
            onChangeText={setColourlessCost}
            value={colourlessCost}
            placeholder='colourless'
            placeholderTextColor={'dimgrey'}
          />
          <TextInput
            style={styles.miniput}
            onChangeText={setColouredCost}
            value={colouredCost}
            placeholder={cost}
            placeholderTextColor={'dimgrey'}
          />
          <Text style={{ marginTop: 12, marginEnd: 5, marginStart: 5 }}>
            life?
          </Text>
          <BouncyCheckbox
            fillColor='black'
            innerIconStyle={{
              borderRadius: 5,
            }}
            onPress={(val) => {
              setUseLife(val);
            }}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.miniput}
            onChangeText={setColourlessOpen}
            value={colourlessOpen}
            placeholder='colourless open'
            placeholderTextColor={'dimgrey'}
          />
          <TextInput
            style={styles.miniput}
            onChangeText={setColouredOpen}
            value={colouredOpen}
            placeholder={available}
            placeholderTextColor={'dimgrey'}
          />
          <Text style={{ marginTop: 12, marginEnd: 5, marginStart: 5 }}>
            ventures:
          </Text>
          <Text style={styles.box}>{availableCasts}</Text>
        </View>
        <Text style={styles.seperator}>------- ventures: -------</Text>
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
            maxHeight={325}
            open={roomsOpen}
            onOpen={onRoomsOpen}
            value={room}
            items={rooms}
            setOpen={setRoomsOpen}
            setValue={setRoom}
            setItems={setRooms}
          />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15 }}>
          <Text style={{ marginTop: 12 }}>ventures: </Text>
          <TextInput
            style={styles.miniput}
            onChangeText={setVentures}
            value={ventures}
            placeholder='total ventures'
          />
          <Text style={{ marginTop: 12, marginEnd: 5, marginStart: 5 }}>
            cost:
          </Text>
          <Text style={styles.box}>{ventureCost}</Text>
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
    height: 35,
    margin: 5,
    width: 207,
    borderWidth: 1,
    padding: 10,
  },
  miniput: {
    borderRadius: 5,
    height: 35,
    width: 110,
    borderWidth: 1,
    marginRight: 5,
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
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
  seperator: {
    marginTop: 20,
    marginBottom: 10,
    marginStart: 75,
  },
});
