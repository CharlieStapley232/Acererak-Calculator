import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useCallback, useEffect } from 'react';

import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView, TextInput } from 'react-native';

export default function App() {
  const [ventures, setVentures] = useState('');
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
  ];
  const roomList = [room1, room2, room3, room4, room5, room6, room7];
  const [dungeonsOpen, setDungeonsOpen] = useState(false);
  const [dungeon, setDungeon] = useState('mine');
  const [dungeons, setDungeons] = useState([
    { label: 'Lost Mine of Phandelver', value: 'mine' },
    { label: 'Dungeon of the Mad Mage', value: 'mage' },
    { label: 'Undercity', value: 'undercity' },
  ]);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [room, setRoom] = useState('0');
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
  const [rooms, setRooms] = useState(rooms1);

  const onRoomsOpen = useCallback(() => {
    setDungeonsOpen(false);
  }, []);

  const onDungeonsOpen = useCallback(() => {
    setRoomsOpen(false);
  }, []);

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
    calculateVentures();
  };

  useEffect(() => {
    calculateVentures();
  }, [ventures]);

  const calculateVentures = () => {
    const calc_dungeon = dungeon ? dungeon : 'mine';
    const calc_ventures = isNum(ventures) ? ventures : 0;
    const calc_room = room ? room : 1;
    if (calc_dungeon === 'mine') {
      const dungeon_len = 4;
      const add_to_all = Math.floor(calc_ventures / dungeon_len);
      for (var i = 0; i < dungeon_len; i++) {
        setRoomList[i]({ val: add_to_all });
      }
      for (
        var i = calc_room;
        i < parseInt(calc_ventures % dungeon_len) + parseInt(calc_room);
        i++
      ) {
        var index = i;
        if (index >= dungeon_len) {
          index = 0 + index - dungeon_len;
        }
        setRoomList[index]((prevVal) => ({ val: prevVal.val + 1 }));
      }
    } else if (calc_dungeon === 'mage') {
      const dungeon_len = 7;
      const add_to_all = Math.floor(calc_ventures / dungeon_len);
      for (var i = 0; i < dungeon_len; i++) {
        setRoomList[i]({ val: add_to_all });
      }
      for (
        var i = calc_room;
        i < parseInt(calc_ventures % dungeon_len) + parseInt(calc_room);
        i++
      ) {
        var index = i;
        if (index >= dungeon_len) {
          index = 0 + index - dungeon_len;
        }
        setRoomList[index]((prevVal) => ({ val: prevVal.val + 1 }));
      }
    } else if (calc_dungeon === 'undercity') {
      const dungeon_len = 5;
      const add_to_all = Math.floor(calc_ventures / dungeon_len);
      for (var i = 0; i < dungeon_len; i++) {
        setRoomList[i]({ val: add_to_all });
      }
      for (
        var i = calc_room;
        i < parseInt(calc_ventures % dungeon_len) + parseInt(calc_room);
        i++
      ) {
        var index = i;
        if (index >= dungeon_len) {
          index = 0 + index - dungeon_len;
        }
        setRoomList[index]((prevVal) => ({ val: prevVal.val + 1 }));
      }
    }
  };

  const isNum = (value) => {
    try {
      const x = parseInt(value);
      if (isNaN(x)) {
        return false;
      } else if (x <= 0) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  };

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
      </SafeAreaView>
    </View>
  );
}

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
